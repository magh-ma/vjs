// TODO
// history
// event system
// redirects
// animated transitions
// test in firefox und safari
// replace pseudo lazy loading with real lazy loading

// REFACTORING
// * "typecast" options into map?

/**
 * Copyright (c) 2020
 * Samuel Weber, Rankweil, Austria
 * 
 * @author Samuel Weber <info@samuelweber.at>
 * @version 0.1
 * 
 * @requires '.
 * @requires './../util/dom.js:flushElement
 * @requires './../util/object.js:isEqual
 * @requires './../constants.js:DEFAULT_OPTIONS
 * @requires './../constants.js:DEFAULT_LOCATION_STATE
 */
import './../types.js';
import { flushElement } from './../util/dom.js';
import { isEqual } from './../util/object.js';
import { Resolver } from './resolver.js';
import {
  DEFAULT_OPTIONS,
  DEFAULT_LOCATION_STATE
} from './../constants.js';



/**
 * VJS Router
 * Router for SPAs utilizing native web components
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

    /**
     * VJS Resolver
     * @private
     * @type {Resolver}
     */
    this._resolver = new Resolver();

    // force scope on methods used by eventListener
    this._onAnchorClick = this._onAnchorClick.bind(this);

    // initialize router
    this.setOptions(options);
    this._setLocation(DEFAULT_LOCATION_STATE);

    if(!this._options.lazy) {
      this._resolver.getRoutes().forEach((r) => this._initComponent(r.component));
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
   * scan for anchor elements and add event listener
   * @private
   * @param {HTMLElement} root - element used for anchorScan
   */
  _anchorScan(root) {
    const anchorElement = [...root.querySelectorAll('a')];
    anchorElement.forEach((a) => a.addEventListener('click', this._onAnchorClick));
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
   * load component by url
   * @public
   * @param {string} url 
   */
  goTo(url) {
    this._resolver.resolve(url)
      .then(({ componentTag, parameter }) => {
        this._loadComponent(componentTag, parameter);
      })
      .catch((err) => console.log('error>', err));
  }

  /**
   * set routes for the router
   * @public
   * @param {Array.<RouterRoute>} routes
   */
  setRoutes(routes) {
    this._resolver.setRoutes(routes);
  }

  /**
   * returns configured routes
   * @public
   * @returns {Array.<RouterRoute>}
   */
  getRoutes() {
    return this._resolver.getRoutes();
  }

  /**
   * removes a route from the existing configuration
   * @public
   * @param {RouterRoute} route 
   */
  removeRoute(route) {
    this._resolver.removeRoute(route);
  }

  /**
   * remove a route from the existing configuration
   * filtered by the path property of the route object
   * @public
   * @param {string} path 
   */
  removeRouteByPath(path) {
    this._resolver.removeRouteByPath(path);
  }
}