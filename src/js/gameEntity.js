/*
 * A game entity is a container for CBaseComponents and other CBaseEntity classes.
 *
 * The lifecycle of an entity:
 * - Created (ctor - allocate & setup)
 * - Enabled/Disabled (turn stuff on)
 * - Update (per frame tick - only when enabled)
 * - Destroyed (dtor - garbage collect)
 *
 * Component methods:
 * - AddComponent(name, comp)
 * - GetCompnent(name)
 * - RemoveComponent(name)
 *
 * Child methods:
 * - AddChild(name, childEntity)
 * - RemoveChild(name, childEntity)
 * - GetChild(name, childEntity)
 */
export class CGameEntity
{
  /**
   * Construct the entity.
   */
  constructor(parentEntity, name='GameObject') {
    /**
     * Reference to parent entity.
     */
    this.parentEntity = parentEntity;
    if(parentEntity != null) {
      // We want to tell the parent that we're attaching. We'll keep checking
      // for a valid name until we hit one.
      let validName = name;
      let isCollision = parentEntity.getChild(validName) != null;
      let n = 1;
      while(isCollision == true) {
	validName = `${name} (${n})`;
        isCollision = parentEntity.getChild(validName) != null;
	n++;
      }
      parentEntity.addChild(validName, this);
      this.name = validName;
    }
    /**
     * List of CGameEntity children.
     *
     * Maps child names to objects.
     */
    this.children = {};
    /**
     * List of CBaseComponent components.
     *
     * Maps component names to objects.
     */
    this.components = {};

    if (parent != null) {
      this.gameApp = parent.gameApp;
      console.warn('No parent set! No reference to GameApp!');
    }

    this.onCreated();
  }

  /**
   * Add a child to this entity.
   */
  addChild(name, newChild) {
    this.children[name] = newChild;
  }

  /**
   * Get a child by name.
   */
  getChild(name) {
    return this.children[name];
  }

  /**
   * Add a component to this entity.
   */
  addComponent(name, newComponent) {
    this.components[name] = newComponent;
  }

  /**
   * Update the current entity.
   *
   * @param {float} delta Delta time between updates.
   */
  update(delta) {
    if(!this._enabled) {
      return;
    }

    this.components.forEach((c) => c.update());
    this.children.forEach((c) => c.update());
  }

  /**
   * Enable or disable the current entity.
   *
   * @param {boolean} isEnabled Next enabled state.
   */
  set enabled(isEnabled) {
    this._enabled = isEnabled;
    if(this._enabled) {
      this.onEnabled();
    } else {
      this.onDisabled();
    }
  }

  get enabled() {
    return this._enabled;
  }
	
  /**
   * Destroy the current entity.
   */
  destroy() {
    this.onDestroyed();
  }

  // Methods for derrived classes to override.
  onCreated() { }
  onEnabled() { }
  onDisabled() { }
  onDestroyed() { } 
}
