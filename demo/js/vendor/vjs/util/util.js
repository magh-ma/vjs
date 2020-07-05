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

/**
 * removes all children from a HTMLElement or DocumentFragment
 * @param {HTMLElement|DocumentFragment} element
 */
export const flushElement = (element) => {
  while (element.firstChild) element.removeChild(element.lastChild);
};

