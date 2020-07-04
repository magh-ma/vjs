/**
 * check if a given parameter is an object
 * @param {any} obj
 */
export const isObject = (obj) => {
  return typeof obj === 'object' && !!obj;
};

/**
 * check if two objects share equal properties and values
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
export const isEqual = (a, b) => (JSON.stringify(a) === JSON.stringify(b));
