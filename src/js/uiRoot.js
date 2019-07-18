import './uiRootButton';

/**
 * Entry-point for UI based stuff.
 * 
 * See 'src/scss/uiRoot.scss' for associated component SCSS.
 */
class UIRoot extends HTMLElement
{
  constructor() {
    super();
    var wrapper = document.createElement('slot');
  }

  setContext(context) {
    console.log(context);
  }

  /**
   * Called when element added to DOM.
   */
  connectedCallback() {
    console.log('UI Root connected to DOM');
  }

    /**
   * Called when element removed from DOM.
   */
  disconnectedCallback() {
    console.log('UI Root Disconected from DOM');
  }

  /**
   * Called when element's observed attribute is changed.
   */
  attributeChangedCallback(name, oldVal, newVal) {
    // console.log(`Attribute: ${name} changed!`);
  }

  /**
   * Defines list of attributes to observe with attributeChangedCallback.
   */
  static get observedAttributes() {
    return [];
  }

  /**
   * Called when element added to DOM.
   */
  adoptedCallback() {
    console.log('adopted!');
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(val) {
      if (val) {
          this.setAttribute('checked', '');
      } else {
          this.removeAttribute('checked');
      }
  }

  render() {
    this.innerHTML = `
      <span>Suuper Early Dev Build</span>
      <slot></slot>
    `;
  }
}

window.customElements.define('ui-root', UIRoot);
export { UIRoot as default }