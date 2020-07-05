/**
 * @author Samuel Weber <info@samuelweber.at>
 * @version 0.1-alpha
 */
import { VIEW_DEFAULT_LOCATION_STATE } from './../constants.js';

export class View extends HTMLElement {
  constructor() {
    super();
    this.location = VIEW_DEFAULT_LOCATION_STATE;
  }
}
