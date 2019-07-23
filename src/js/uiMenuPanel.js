import './uiRootButton';

/**
 * Manages the top-level menu panel.
 * 
 * See 'src/scss/uiMenuPanel.scss' for associated component SCSS.
 */
export class UIMenuPanel extends HTMLElement
{
  constructor() {
    super();
    let shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(document.createElement('slot'));
  }

  /**
   * Defines list of attributes to observe with attributeChangedCallback.
   */
  static get observedAttributes() {
    return ['opened'];
  }

  get opened() {
    return this.hasAttribute('opened');
  }

  set opened(val) {
    if (val) {
      this.setAttribute('opened', '');
    } else {
      this.removeAttribute('opened');
    }
  }
}

window.customElements.define('ui-menu-panel', UIMenuPanel);