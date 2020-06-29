/**
 * default options
 * @type {RouterOptions} DEFAULT_OPTIONS
 */
export const DEFAULT_OPTIONS = {
  container: null,
  routes: [],
  lazy: true,
  anchorScan: null
};

/**
 * default location state
 * @type {RouterLocation} DEFAULT_LOCATION_STATE
 * @property {Object.<string, string>} parameter
 * @property {string} component
 */
export const DEFAULT_LOCATION_STATE = {
  parameter: {},
  component: null,
};