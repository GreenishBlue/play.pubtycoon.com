/**
 * Entry-point for UI based stuff.
 * 
 * See 'src/scss/uiRoot.scss' for associated component SCSS.
 */
class UIRoot extends HTMLElement
{
  constructor()
  {
    super();
    this.render();
  }

  /**
   * Called when element added to DOM.
   */
  connectedCallback()
  {
    console.log('UI Root connected to DOM');
  }

    /**
   * Called when element removed from DOM.
   */
  disconnectedCallback()
  {
    console.log('UI Root Disconected from DOM');
  }

  /**
   * Called when element's observed attribute is changed.
   */
  attributeChangedCallback(name, oldVal, newVal)
  {
    // console.log(`Attribute: ${name} changed!`);
  }

  /**
   * Defines list of attributes to observe with attributeChangedCallback.
   */
  static get observedAttributes()
  {
    return [];
  }

  /**
   * Called when element added to DOM.
   */
  adoptedCallback()
  {
    console.log('adopted!');
  }

  render()
  {
    this.innerHTML = '<span>Suuper Early Dev Build</span>';
  }
}

window.customElements.define('ui-root', UIRoot);
export { UIRoot as default }