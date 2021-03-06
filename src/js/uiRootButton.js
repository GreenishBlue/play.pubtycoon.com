/**
 * Button to open game's main panels.
 * 
 * See 'src/scss/uiRootButton.scss' for associated component SCSS.
 */
class UIRootButton extends HTMLElement
{
  constructor() {
    super();
    this.icon = 'menu';
    this.size = 'default';
    this.render();
  }

  /**
   * Called when element's observed attribute is changed.
   */
  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case "icon":
        this.icon = newVal;
      case "size":
        this.size = newVal;
    }

    this.render();
  }

  /**
   * Defines list of attributes to observe with attributeChangedCallback.
   */
  static get observedAttributes() {
    return ['icon', 'size'];
  }

  render() {
    this.innerHTML = `
      <a href="#">
        <div class="${this.size == 'small' ? 'small' : ''}">
            <i class="material-icons">${this.icon}</i>
        </div>
      </a>
    `;
  }
}

window.customElements.define('ui-root-button', UIRootButton);
export { UIRootButton as default }