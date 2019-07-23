

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
export class CRoomFoundations
{
  /**
   * Setup the room build system.
   * 
   * @param {PubTycoon.GameApp} gameApp Reference to GameApp.
   */
  constructor(gameApp) {
    const boxGeometry = new BoxGeometry(25, 25, 1);
    const basicMaterial = new MeshStandardMaterial({ color: 0x666666 });
    const plane = new Mesh(boxGeometry, basicMaterial);
    plane.rotateX(Math.PI / 2);
    plane.position.set(0, -0.5, 0);
    gameApp.scene.add(plane);

    const colorGrid       = 0xFFFFFF,
          colorCenterLine = 0xFFCF1E,
          gridSize        = 50,
          gridDivisions   = 20;
    var gridHelper = new GridHelper(gridSize, gridDivisions, colorCenterLine,
                                    colorGrid);
    gameApp.scene.add(gridHelper);
    // gameApp.scene.remove(gridHelper);
  }

  /**
   * Executes on each frame.
   */
  update() {

  }
}