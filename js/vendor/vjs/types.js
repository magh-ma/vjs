/**
 * private route
 * @typedef {Object} IResolverRoute
 * @property {RegExp} matchExp - RegExp used to match urls
 */

/**
 * @typedef {Object} IRouterLocation
 * @property {RouterLocation} location
 */

/**
 * view component of the router
 * @typedef {HTMLElement & IView} ViewComponent
 */

/**
 * @typedef {Object} IView
 * @property {RouterLocation} location
 * @property {function} onBeforeLeave
 * @property {function} onAfterLeave
 * @property {function} onBeforeEnter
 * @property {function} onAfterEnter
 */

/**
 * options
 * @typedef {Object} RouterOptions
 * @property {HTMLElement} container - HTMLElement utilized as container for the components
 * @property {Array.<ResolverRoute>} routes - array of internal route objects
 * @property {boolean} initViewsAtStart - initialize all view components
 * @property {HTMLElement} anchorScan - HTMLElement used to scan for anchor elements
 */

/**
 * public route
 * @typedef {Object} RouterRoute
 * @property {string} path - path of the route
 * @property {string} component - HTML tag of the component
 */
 
/**
 * private route
 * @typedef {RouterRoute & IResolverRoute} ResolverRoute
 */

 /**
 * router location state
 * @typedef {Object} RouterLocation
 * @property {string} componentTag - holds the HTMLTag of the component
 * @property {Object.<string, string>} parameter - holds the parameter of the location
 * @property {string} pathname - string of the current pathname
 */

