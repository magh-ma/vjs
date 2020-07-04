import { View } from './../../vendor/vjs/router/view.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
  :host {
    display: block;
  }
  </style>
  <h1>error-page</h1>
`;

export class ErrorPage extends View {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    console.log('ErrorPage.constructor()');
  }

  connectedCallback() {
    console.log('ErrorPage.connectedCallback()');
  }
}

window.customElements.define('error-page', ErrorPage);