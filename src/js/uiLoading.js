/**
 * Shows the UI loading.
 * 
 * See 'src/scss/uiLoading.scss' for associated component SCSS.
 */
export class UILoading extends HTMLElement
{
  constructor() {
    super();
    let shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(document.createElement('slot'));
  }

  get loaded() {
    return this.hasAttribute('loaded');
  }

  set loaded(val) {
    if (val) {
      this.setAttribute('loaded', '');
    } else {
      this.removeAttribute('loaded');
    }
  }
}

window.customElements.define('ui-loading', UILoading);