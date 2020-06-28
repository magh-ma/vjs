// TODO
// history
// event system
// redirects
// animated transitions
// test in firefox und safari
// replace pseudo lazy loading with real lazy loading

// REFACTORING
// * create resolver
// * "typecast" options into map?

/**
 * Copyright (c) 2020
 * Samuel Weber, Rankweil, Austria
 * 
 * @author Samuel Weber <info@samuelweber.at>
 * @version 0.1
 * 
 * @requires './../util/dom.js:flushElement
 * @requires './../util/object.js:isEqual
 * @requires './../constants.js:DEFAULT_OPTIONS
 * @requires './../constants.js:DEFAULT_LOCATION_STATE
 */
import './../types.js';
import { flushElement } from './../util/dom.js';
import { isEqual } from './../util/object.js';
import {
  DEFAULT_OPTIONS,
  DEFAULT_LOCATION_STATE
} from './../constants.js';



/**
 * VJS Router
 * clean vanilla js Router for building SAP applications
 * utilizing native web components
 */
export class Router {

  /**
   * initialize Router
   * @param {Object.<string, any>} [options]
   */
  constructor(options = DEFAULT_OPTIONS) {

    /**
     * holds the configuration of the router
     * @private
     * @type {RouterOptions}
     */
    this._options;

    /**
     * cache of loaded components
     * @private
     * @type {Map.<string, ViewComponent>}
     */
    this._cache = new Map();

    /**
     * current state of the router
     * @private
     * @type {RouterLocation}
     */
    this._location;

    // force scope on methods used by eventListener
    this._onAnchorClick = this._onAnchorClick.bind(this);

    // initialize router
    this.setOptions(options);
    this._setLocation(DEFAULT_LOCATION_STATE);

    if(!this._options.lazy) {
      this._options.routes.forEach((r) => this._initComponent(r.component));
    }

    if(this._options.anchorScan) {
      this._anchorScan(this._options.anchorScan)
    }    
  }

  /**
   * sets location state
   * @private
   * @param {RouterLocation} location 
   */
  _setLocation(location) {
    this._location = {
      ...this._location,
      ...location,
    };
  }

  /**
   * get location state
   * @private
   * @returns {RouterLocation}
   */
  _getLocation() {
    return { ...this._location };
  }

  /**
   * returns the regular expression to perform
   * search queries on the routes
   * @private
   * @param {string} path 
   * @returns {RegExp}
   */
  _getMatchExp(path) {
    /**
     * returns the replace string for matches
     * @param {string} match 
     * @param {string} p1 
     * @param {number} offset 
     * @param {string} string 
     * @returns {string}
     */
    const replaceCallback = (match, p1, offset, string) => {      
      const pOffset = offset + match.length;
      const isOptional = (string.substring(pOffset, pOffset + 1) === '?');
      
      let str = `(?<${p1}>[\\w-]+)`;
      if (isOptional) {
        str = '?' + str;
      };

      return str;
    };
    const regexStr = path.replace(/:([\w-]+)/g, replaceCallback);

    return new RegExp(`^${regexStr}/?$`);
  }

  /**
   * scan for anchor elements and add event listener
   * @private
   * @param {HTMLElement} root - element used for anchorScan
   */
  _anchorScan(root) {
    const anchorElement = [...root.querySelectorAll('a')];
    anchorElement.forEach((a) => a.addEventListener('click', this._onAnchorClick));
  }

  /**
   * returns a route object for internal use
   * @private
   * @param {PublicRoute} route 
   * @returns {PrivateRoute}
   */
  _createRoute(route) {
    const matchExp = this._getMatchExp(route.path);
    return {
      matchExp, 
      path: route.path,
      component: route.component,       
    }
  }

  /**
   * initialize component and add it to the cache
   * @private
   * @param {string} componentTag 
   */
  _initComponent(componentTag) {
    const component = /** @type {ViewComponent} **/(document.createElement(componentTag));
    this._cache.set(componentTag, component);
  }

  /**
   * this method will handle loading in future ;)
   * @private
   * @param {string} componentTag 
   * @param {Object.<string, string>} parameter 
   */
  _loadComponent(componentTag, parameter) {
    // init component if not already in cache
    if(!this._cache.has(componentTag)) {
      this._initComponent(componentTag);
    }

    // declare previous state
    const prevLocationState = this._getLocation();

    // update location state
    this._setLocation({
      parameter: parameter || {},
      component: componentTag,
    });

    // declare next state
    const nextState = this._getLocation();

    // get component and update location object
    const component = this._cache.get(componentTag);
    component.location = nextState;

    // guard clause to prevent unnecessary rendering
    if(isEqual(prevLocationState, nextState)) {
      return;
    }
    
    // render component
    flushElement(this._options.container);
    this._options.container.appendChild(component);
  }

  /**
   * click handler for anchor navigation anchor
   * @private
   * @param {MouseEvent} e 
   */
  _onAnchorClick(e) {
    e.preventDefault();
    this.goTo(/** @type {HTMLAnchorElement} **/(e.target).pathname);
  }

  /**
   * set options for router configuration
   * @public
   * @param {Object.<string, any>} options 
   */
  setOptions(options) {
    this._options = {
      ...DEFAULT_OPTIONS,
      ...options
    };

    this.setRoutes(this._options.routes);
  }

  /**
   * returns current router configuration
   * @public
   * @returns {RouterOptions}
   */
  getOptions() {
    return { ...this._options };
  }


  /**
   * set routes for the router
   * @public
   * @param {Array.<PublicRoute>} routes 
   */
  setRoutes(routes) {
    this._options.routes = routes.map((route) => this._createRoute(route));
  }

  /**
   * returns configured routes
   * @public
   * @returns {Array.<PublicRoute>}
   */
  getRoutes() {
    return this._options.routes.map((route) => ({
      path: route.path,
      component: route.component,
    }));
  }

  /**
   * adds a route to the existing configuration
   * @public
   * @param {PublicRoute} route 
   */
  addRoute(route) {
    this._options.routes.push(this._createRoute(route));
  }

  /**
   * removes a route from the existing configuration
   * @public
   * @param {PublicRoute} route 
   */
  removeRoute(route) {
    this._options.routes = this._options.routes.filter((r) => r.path !== route.path);
  }

  /**
   * remove a route from the existing configuration
   * filtered by the path property of the route object
   * @public
   * @param {string} path 
   */
  removeRouteByPath(path) {
    this._options.routes = this._options.routes.filter((r) => r.path !== path);
  }

  /**
   * load component by url
   * @public
   * @param {string} url 
   */
  goTo(url) {
    for (let i = 0; i < this._options.routes.length; ++i) {
      const match = url.match(this._options.routes[i].matchExp);
      if (match) {
        const componentTag = this._options.routes[i].component;
        // @ts-ignore - default ts compiler does not support group property on RegExpMatchArray
        const parameter = match.groups;
        this._loadComponent(componentTag, parameter);
        return;
      }
    }
  }  
}