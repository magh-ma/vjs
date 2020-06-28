import { View } from './../../vendor/vjs/router/view.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
  :host {
    display: block;
  }
  </style>
  <h1>log-list-page</h1>
`;

export class LogListPage extends View {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    console.log('LogListPage.constructor()');
  }

  connectedCallback() {
    console.log('LogListPage.connectedCallback()');
  }
}

window.customElements.define('log-list-page', LogListPage);