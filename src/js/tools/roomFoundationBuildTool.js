import { CBaseTool } from './baseTool.js';

/**
 * Foundation build tool. Allows click/drag creation of rooms.
 */
export class CRoomFoundationBuildTool extends CBaseTool
{
  constructor(roomFoundations) {
    super();
    this._roomFoundations = roomFoundations;
  }
}