import { View } from './../../vendor/vjs/router/view.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
  :host {
    display: block;
  }
  </style>
  <h1>landing-page</h1>
`;

export class LandingPage extends View {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    console.log('LandingPage.constructor()');
  }

  connectedCallback() {
    console.log('LandingPage.connectedCallback()');
  }

  onBeforeLeave(prevState, nextState) {
    console.log('LandingPage.onBeforeLeave', {
      prevState,
      nextState,
    });
  }

  onAfterLeave(prevState, nextState) {
    console.log('LandingPage.onAfterLeave', {
      prevState,
      nextState,
    });
  }
}

window.customElements.define('landing-page', LandingPage);
