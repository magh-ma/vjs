/**
 * @author Samuel Weber <info@samuelweber.at>
 * @version 0.1-alpha
 */

/**
 * removes all children from a HTMLElement or DocumentFragment
 * @param {HTMLElement|DocumentFragment} element
 */
export const flushElement = (element) => {
  while (element.firstChild) element.removeChild(element.lastChild);
};
