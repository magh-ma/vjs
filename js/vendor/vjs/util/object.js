/**
 * check if a given parameter is an object
 * @param {any} obj
 */
export const isObject = (obj) => {
  var type = typeof obj;
  return (type === 'function' || (type === 'object' && !!obj && !Array.isArray(obj)));
};

/**
 * check if two objects share equal properties and values
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
export const isEqual = (a, b) => (JSON.stringify(a) === JSON.stringify(b));
