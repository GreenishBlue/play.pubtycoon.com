

import { Object3D } from 'three';
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
    this.gameApp = gameApp;
    /**
     * Stores room dimensions.
     */
    this.rooms = {
      '01': {
	'width': 20,
	'length': 20,
	'x': 0,
	'z': 0,
      },
    };
    /**
     * Material for room foundations.
     */
    this.material = new MeshStandardMaterial({ color: 0x666666 });
    this.woodMaterial = new MeshStandardMaterial({ color: 0xF7D679 });
    /** 
     * Reference to THREE meshes.
     */
    this.mesh_references = [];
    this.refresh();
  }

  refresh() {
    const currentRoom = this.rooms['01'];
    let width = currentRoom['width'] / 10 * 25,
	length = currentRoom['length'] / 10 * 25,
	height = 1.0,
	x = currentRoom['x'],
	y = currentRoom['y'];
    const geometry = new BoxGeometry(length, width, height);
    const plane = new Mesh(geometry, this.material);
    plane.rotateX(Math.PI / 2);
    plane.position.set(0, -0.5 - 5, 0);
    this.gameApp.scene.add(plane);

    const plane2 = new Mesh(geometry, this.woodMaterial);
    plane2.rotateX(Math.PI / 2);
    plane2.position.set(0, 0.5 - 5, 0);
    this.gameApp.scene.add(plane2);

    const wall1 = new Mesh(new BoxGeometry(length, 10, 1), this.material);
    const wall2 = new Mesh(new BoxGeometry(1, 10, length), this.material);
    wall1.position.set(0, 0, -25.5);
    wall2.position.set(-25.5, 0, 0);
    this.gameApp.scene.add(wall1);
    this.gameApp.scene.add(wall2);

    const colorGrid       = 0xFFFFFF,
          colorCenterLine = 0xFFCF1E,
          gridSize        = 50,
          gridDivisions   = 20;
    var gridHelper = new GridHelper(gridSize, gridDivisions, colorCenterLine,
                                    colorGrid);
    gridHelper.position.set(0, -3.99, 0);
    this.gameApp.scene.add(gridHelper);
  }

  /**
   * Executes on each frame.
   */
  update() {
  }
}
