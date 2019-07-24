/**
 * A game entity represents something in the world.
 */
export class CGameEntity
{
  constructor(parent) {
    this.components = [];
    this.children = [];
    this.parent = parent;
    if (parent != null) {
      this.gameApp = parent.gameApp;
    } else {
      // Will be set by external forces..
    }
  }

  addComponent(newComponent) {
    newComponent.entity = this;
    this.components.push(newComponent);
  }

  addChild(newChild) {
    newChild.parent = this;
    this.children.push(newChild);
  }

  update() {
    this.components.forEach(component => component.update());
  }
}