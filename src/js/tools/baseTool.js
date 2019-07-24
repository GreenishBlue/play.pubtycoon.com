/**
 * A tool is a generic user-interactable system for modifying the game world.
 * 
 * Examples: Placing decorations, painting walls, destroying rooms.
 * Constraints:
 * - Only one tool can be active at a time. This is managed by CToolManager.
 */
export class CBaseTool
{
  constructor() {
    this._active = false;
  }

  set active(newActive) {
    this._active = newActive;
    if (newActive) {
      this.onActivate();
    } else {
      this.onDeactivate();
    }
  }

  get active() {
    return this._active;
  }

  onActivate() {
    console.warn('Tool activate unimplemented');
  }

  onDeactivate() {
    console.warn('Tool deactivate unimplemented');
  }

  onClick() {
    // console.warn('Tool click event unimplemented');
  }
}