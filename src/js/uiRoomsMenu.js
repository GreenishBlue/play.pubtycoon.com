import './uiRootButton';

/**
 * Displays rooms menu.
 * 
 * See 'src/scss/uiRoomsMenu.scss' for associated component SCSS.
 */
export class UIRoomsMenu extends HTMLElement
{
  constructor() {
    super();
    var wrapper = document.createElement('slot');
  }
}

window.customElements.define('ui-rooms-menu', UIRoot);