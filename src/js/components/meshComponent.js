import { CBaseComponent } from './baseComponent';
import { Mesh } from 'three';

/**
 * Represents a mesh.
 * 
 * Implemented with THREE.
 */
export class CMeshComponent extends CBaseComponent
{
  constructor(geometry, material) {
    super();
    this._geometry = geometry;
    this._material = material;
  }

  onAdded() {
    if (this._material == null) {
      console.error('Material is null passed to mesh component');
      return;
    }

    if (this._geometry == null) {
      console.error('Geometry is null passed to mesh component');
      return;
    }
    
    this._mesh = new Mesh(this._geometry, this._mesh);
  }

  onRemoved() {
    // todo: handle garbage collection.
  }
}