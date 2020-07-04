/**
 * default options
 * @type {RouterOptions} DEFAULT_OPTIONS
 */
export const DEFAULT_OPTIONS = {
  container: null,
  routes: [],
  initViewsAtStart: false,
  anchorScan: null,
};

/**
 * default location state
 * @type {RouterLocation} DEFAULT_LOCATION_STATE
 * @property {Object.<string, string>} parameter
 * @property {string} component
 */
export const DEFAULT_LOCATION_STATE = {
  componentTag: null,
  parameter: {},
  pathname: null,
};

/**
 * @constant
 * @type {string} string identifier for the vjs router click event
 */
export const EVT_ONCLICK = 'vjs:router:click';

/**
 * @constant
 * @type {string} string identifier for the vjs router popstate event
 */
export const EVT_POPSTATE = 'vjs:router:popstate'