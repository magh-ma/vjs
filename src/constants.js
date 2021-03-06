/**
 * default options
 * @type {RouterOptions} ROUTER_DEFAULT_OPTIONS
 */
export const ROUTER_DEFAULT_OPTIONS = {
  container: null,
  routes: [],
  initViewsAtStart: false,
  anchorScan: null,
  debug: false,
};

/**
 * default location state
 * @type {RouterLocation} VIEW_DEFAULT_LOCATION_STATE
 * @property {Object.<string, string>} parameter
 * @property {string} component
 */
export const VIEW_DEFAULT_LOCATION_STATE = {
  componentKey: null,
  parameter: {},
  pathname: null,
};

/**
 * @constant
 * @type {string} string identifier for the vjs router click event
 */
export const ROUTER_EVT_CLICK = 'vjs:router:click';

/**
 * @constant
 * @type {string} string identifier for the vjs router popstate event
 */
export const ROUTER_EVT_POPSTATE = 'vjs:router:popstate';

/**
 * @constant
 * @type {string} string identifier for the vjs router beforeLeave event
 */
export const VIEW_EVT_BEFORE_LEAVE = 'vjs:view:beforeLeave';
/**
 * @author Samuel Weber <info@samuelweber.at>
 * @version 0.1-alpha
 */

/**
 * @constant
 * @type {string} string identifier for the vjs router afterLeave event
 */
export const VIEW_EVT_AFTER_LEAVE = 'vjs:view:afterLeave';

/**
 * @constant
 * @type {string} string identifier for the vjs router beforeEnter event
 */
export const VIEW_EVT_BEFORE_ENTER = 'vjs:view:beforeEnter';

/**
 * @constant
 * @type {string} string identifier for the vjs router afterEnter event
 */
export const VIEW_EVT_AFTER_ENTER = 'vjs:view:afterEnter';
