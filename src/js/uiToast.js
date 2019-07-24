/**
 * Displays toasts to the user.
 * 
 * See 'src/scss/uiNotification.scss' for associated component SCSS.
 */
class UIToast extends HTMLElement
{
  constructor() {
    super();
    const slot = document.createElement('slot');
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.append(slot);
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

  /**
   * Called when element added to DOM.
   */
  adoptedCallback() {
    // console.log('adopted!');
  }
}

window.customElements.define('ui-toast', UIToast);
export { UIToast as default }
