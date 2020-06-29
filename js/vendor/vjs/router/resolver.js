/**
 * Copyright (c) 2020
 * Samuel Weber, Rankweil, Austria
 * 
 * @author Samuel Weber <info@samuelweber.at>
 * @version 0.1
 */

/**
 * VJS Resolver
 * Resolver utilized by VJS Router
 */
export class Resolver {

  /**
   * initialize Resolver
   */
  constructor() {

    /**
     * routes
     * @private
     * @type {Array.<ResolverRoute>}
     */
    this._routes = [];


  }

  /**
   * returns the regular expression to perform
   * search queries on the routes
   * @private
   * @param {string} path 
   * @returns {RegExp}
   */
  _createMatchExp(path) {
    const regexStr = path.replace(/:([\w-]+)/g, this.replaceCallback);

    return new RegExp(`^${regexStr}/?$`);
  }

  /**
   * returns the replace string for matches
   * @param {string} match 
   * @param {string} p1 
   * @param {number} offset 
   * @param {string} string 
   * @returns {string}
   */
  replaceCallback(match, p1, offset, string) {      
    const pOffset = offset + match.length;
    const isOptional = (string.substring(pOffset, pOffset + 1) === '?');

    let str = `(?<${p1}>[\\w-]+)`;
    if (isOptional) {
      str += '?';
    };

    return str;
  };

  /**
   * returns a route object for internal use
   * @private
   * @param {RouterRoute} route 
   * @returns {ResolverRoute}
   */
  _createRoute(route) {
    const matchExp = this._createMatchExp(route.path);
    return {
      matchExp, 
      path: route.path,
      component: route.component,       
    }
  }
  
  /**
   * set routes for the router
   * @public
   * @param {Array.<RouterRoute>} routes 
   */
  setRoutes(routes) {
    this._routes = routes.map((route) => this._createRoute(route));
  }

  /**
   * returns configured routes
   * @public
   * @returns {Array.<RouterRoute>}
   */
  getRoutes() {
    return this._routes.map((route) => ({
      path: route.path,
      component: route.component,
    }));
  }

  /**
   * removes a route from the existing configuration
   * @public
   * @param {RouterRoute} route 
   */
  removeRoute(route) {
    this._routes = this._routes.filter((r) => r.path !== route.path);
  }

  /**
   * remove a route from the existing configuration
   * filtered by the path property of the route object
   * @public
   * @param {string} path 
   */
  removeRouteByPath(path) {
    this._routes = this._routes.filter((r) => r.path !== path);
  }

  /**
   * resolves URL into its componentTag and parameters
   * @param {string} url 
   * @returns {Promise}
   */
  resolve(url) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this._routes.length; ++i) {
        const match = url.match(this._routes[i].matchExp);
        if (match) {
          const componentTag = this._routes[i].component;
          // @ts-ignore - default ts compiler does not support group property on RegExpMatchArray
          const parameter = match.groups;
          resolve({ componentTag, parameter });
        }
      }
      reject({
        error: 404
      });
    });
  }
}