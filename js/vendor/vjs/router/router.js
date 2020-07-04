// TODO
//
// implement eslint
// add type definition for lifecycle method parameter
//
// redirects
// animated transitions
// test in firefox und safari
// lazy loading
// error handling

// REFACTORING
// refactor goTo() 
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
 * @requires './resolver.js:Resolver
 * @requires './../constants.js:DEFAULT_OPTIONS
 * @requires './../constants.js:DEFAULT_LOCATION_STATE
 */
import './../types.js';
import { flushElement } from './../util/dom.js';
import { isEqual } from './../util/object.js';
import { Resolver } from './resolver.js';
import {
  DEFAULT_OPTIONS,
  DEFAULT_LOCATION_STATE,
  EVT_CLICK,
  EVT_POPSTATE,
  EVT_BEFORE_LEAVE,
  EVT_AFTER_LEAVE,
  EVT_BEFORE_ENTER,
  EVT_AFTER_ENTER
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
    this._onPopState = this._onPopState.bind(this);

    // initialize Router

    // set merged options
    this.setOptions(options);
    // set default location state
    this._setLocation(DEFAULT_LOCATION_STATE);
    // init all view components if required
    if(this._options.initViewsAtStart) {
      this._resolver.getRoutes().forEach((r) => this._initComponent(r.component));
    }
    // scan HTMLElement for HTMLAnchorElements and
    // add eventListener 
    if(this._options.anchorScan && this._options.anchorScan instanceof HTMLElement) {
      this._anchorScan(this._options.anchorScan)
    }

    window.addEventListener('popstate', this._onPopState);
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
   * @param {RouterLocation} state
   */
  _displayComponent(state) {
    // init component if not already in cache
    if(!this._cache.has(state.componentTag)) {
      this._initComponent(state.componentTag);
    }

    // get component and update location object
    const component = this._cache.get(state.componentTag);
    this._setLocation(state);
    component.location = this._getLocation();

    // render component
    flushElement(this._options.container);
    this._options.container.appendChild(component);
  }

  /**
   * @param {string} type 
   * @param {object} detail
   */
  _dispatchRouterEvent(type, detail) {
    console.log('dispatch', { type, detail });
    window.dispatchEvent(new CustomEvent(type, { detail }));
  }

  _getCachedComponentByTag(componentTag) {
    if(componentTag === null) return null;

    if(!this._cache.has(componentTag)) {
      this._initComponent(componentTag);
    }
    return this._cache.get(componentTag);
  }

  /**
   * click handler for navigation anchor
   * @private
   * @param {MouseEvent} e 
   */
  _onAnchorClick(e) {
    e.preventDefault();
    const pathname = /** @type {HTMLAnchorElement} **/(e.target).pathname;
    this._dispatchRouterEvent(EVT_CLICK, { pathname });
    this.goTo(pathname);
  }

  _onPopState({ state }) {
    console.log('_onPopState');
    this._displayComponent(state);
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
      .then((state) => {
        // guard clause checking if there is a state change
        if(!isEqual(this._getLocation(), state)) {
          // compose detail object
          const detail = {
            prevLocation: this._getLocation(),
            nextLocation: state,
          };
          // fetch current view component if possible
          const prevComponent = this._getCachedComponentByTag(this._getLocation().componentTag);
          if(prevComponent !== null) {
            // check if there is a callback we have to invoke
            if(typeof prevComponent.onBeforeLeave === 'function') {
              // invoke callback
              prevComponent.onBeforeLeave(detail);
            }
            
            // dispatch beforeLeave event
            this._dispatchRouterEvent(EVT_BEFORE_LEAVE, detail);
          }

          // update history and dispatch popstate event
          window.history.pushState(state, '', state.pathname);
          this._dispatchRouterEvent(EVT_POPSTATE, state);

          if(prevComponent !== null) {
            // compose detail object
            // check if there is a callback we have to invoke
            if(typeof prevComponent.onAfterLeave === 'function') {
              // invoke callback
              prevComponent.onAfterLeave(detail);
            } 
            // dispatch beforeLeave event
            this._dispatchRouterEvent(EVT_AFTER_LEAVE, detail)
          }

          const nextComponent = this._getCachedComponentByTag(state.componentTag);
          // check if there is a callback we have to invoke
          if(typeof nextComponent.onBeforeEnter === 'function') {
            // invoke callback
            nextComponent.onBeforeEnter(detail);
          } 
          // dispatch beforeLeave event
          this._dispatchRouterEvent(EVT_BEFORE_ENTER, detail);

          this._displayComponent(state);

          // check if there is a callback we have to invoke
          if(typeof nextComponent.onAfterEnter === 'function') {
            // invoke callback
            nextComponent.onAfterEnter(detail);
          } 
          // dispatch beforeLeave event
          this._dispatchRouterEvent(EVT_AFTER_ENTER, detail);



          


        }
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