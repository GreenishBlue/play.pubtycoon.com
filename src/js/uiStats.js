/**
 * Displays the game stats.
 * 
 * See 'src/scss/uiStats.scss' for associated component SCSS.
 */
export class UIStats extends HTMLElement
{
  constructor() {
    super();

    const slot = document.createElement('slot');
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.append(slot);

    this.render();
  }

  /**
   * Called when element's observed attribute is changed.
   */
  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case 'message':
        this.message = newVal;
    }

    this.render();
  }

  /**
   * Defines list of attributes to observe with attributeChangedCallback.
   */
  static get observedAttributes() {
    return ['message'];
  }
}

window.customElements.define('ui-stats', UIStats);
