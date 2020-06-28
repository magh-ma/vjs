import { View } from './../../vendor/vjs/router/view.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
  :host {
    display: block;
  }
  </style>
  <h1>log-detail-page</h1>
  <pre></pre>
`;

/**
 * detail page for logs
 */
export class LogDetailPage extends View {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.domPre = this.shadowRoot.querySelector('pre');

    console.log('LogDetailPage.constructor()');
  }

  connectedCallback() {
    console.log('LogDetailPage.connectedCallback()');
    this.domPre.textContent = JSON.stringify(this.location);
  }
}

window.customElements.define('log-detail-page', LogDetailPage);