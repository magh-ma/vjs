import { DEFAULT_LOCATION_STATE } from './../constants.js';

export class View extends HTMLElement {
  constructor() {
    super();
    this.location = DEFAULT_LOCATION_STATE;
  }
}