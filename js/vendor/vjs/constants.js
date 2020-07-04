/**
 * default options
 * @type {RouterOptions} DEFAULT_OPTIONS
 */
export const DEFAULT_OPTIONS = {
  container: null,
  routes: [],
  initViewsAtStart: false,
  anchorScan: null,
  debug: false,
};

/**
 * default location state
 * @type {RouterLocation} DEFAULT_LOCATION_STATE
 * @property {Object.<string, string>} parameter
 * @property {string} component
 */
export const DEFAULT_LOCATION_STATE = {
  componentKey: null,
  parameter: {},
  pathname: null,
};

/**
 * @constant
 * @type {string} string identifier for the vjs router click event
 */
export const EVT_CLICK = 'vjs:router:click';

/**
 * @constant
 * @type {string} string identifier for the vjs router popstate event
 */
export const EVT_POPSTATE = 'vjs:router:popstate'

/**
 * @constant
 * @type {string} string identifier for the vjs router beforeLeave event
 */
export const EVT_BEFORE_LEAVE = 'vjs:view:beforeLeave'

/**
 * @constant
 * @type {string} string identifier for the vjs router afterLeave event
 */
export const EVT_AFTER_LEAVE = 'vjs:view:afterLeave'

/**
 * @constant
 * @type {string} string identifier for the vjs router beforeEnter event
 */
export const EVT_BEFORE_ENTER = 'vjs:view:beforeEnter'

/**
 * @constant
 * @type {string} string identifier for the vjs router afterEnter event
 */
export const EVT_AFTER_ENTER = 'vjs:view:afterEnter'