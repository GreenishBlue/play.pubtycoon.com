import { CGameEntity } from './gameEntity';
import { CMeshComponent } from './components/meshComponent';

import { BoxGeometry, MeshStandardMaterial, Mesh } from 'three';
import { GridHelper } from 'three';

/**
 * This system handles building the foundations of the rooms. It is the 'base'
 * layer which the objects/decoration system works on top of.
 * 
 * There are smaller sub-systems which handle different aspects of this.
 * 
 * Constraints:
 * - Fixed sized grid for construction upon by player (20x20 by default)
 * - Each room is rectangular in shape.
 * Actions:
 * - Place/construct room (if possible!)
 * - Destroy room
 * Scope:
 * - Walls are handled by a different system.
 * - No objects here.
 */
export class CRoomFoundations extends CGameEntity
{
  /**
   * Setup the room build system.
   * 
   * @param {PubTycoon.GameApp} gameApp Reference to GameApp.
   */
  constructor(parent) {
    super(parent);

    // const plane = new Mesh(boxGeometry, basicMaterial);
    // plane.rotateX(Math.PI / 2);
    // plane.position.set(0, -0.25, 0);
    // gameApp.scene.add(plane);

    // const colorGrid       = 0xFFFFFF,
    //       colorCenterLine = 0xFFCF1E,
    //       gridSize        = 20,
    //       gridDivisions   = 20;
    // var gridHelper = new GridHelper(gridSize, gridDivisions, colorCenterLine,
    //                                 colorGrid);
    // gameApp.scene.add(gridHelper);
    // gameApp.scene.remove(gridHelper);
  }

  addRoom() {
    const boxGeometry = new BoxGeometry(20, 20, 0.5);
    const basicMaterial = new MeshStandardMaterial({ color: 0x666666 });
    const mesh = new Mesh(boxGeometry, basicMaterial);

    // this.floorEntity = new CGameEntity(this);
    // const meshComp = new CMeshComponent(boxGeometry, basicMaterial);
    // this.floorEntity.addComponent(meshComp);
    mesh.rotateX(Math.PI / 2);
    mesh.position.set(0, -0.25, 0);
    this.gameApp.scene.add(mesh);
  }

  /**
   * Executes on each frame.
   */
  update() {
    this.floorEntity.update();
  }
}