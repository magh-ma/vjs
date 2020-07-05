/**
 * removes all children from a HTMLElement or DocumentFragment
 * @param {HTMLElement|DocumentFragment} element
 */
export const flushElement = (element) => {
  while (element.firstChild) element.removeChild(element.lastChild);
};
