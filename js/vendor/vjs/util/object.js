/**
 * @author Samuel Weber <info@samuelweber.at>
 * @version 0.1-alpha
 */

/**
 * check if a given parameter is an object
 * @param {any} obj
 */
export const isObject = (obj) => (typeof obj === 'object' && !!obj);

/**
 * check if two objects share equal properties and values
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
export const isEqual = (a, b) => (JSON.stringify(a) === JSON.stringify(b));
