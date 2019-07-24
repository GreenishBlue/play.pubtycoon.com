/**
 * The game tool manager controls which tools are active.
 * 
 * Constraints:
 * - Only one tool can be active at a time.
 */
export class CGameToolManager
{
  /**
   * Construct the tool manager.
   * 
   * @param {PubTycoon.GameApp} gameApp Reference to GameApp context.
   * @param {{
   *  "toolName": PubTycoon.CGameTool,..
   * }} tools Array of game tools to register.
   */
  constructor(gameApp, tools) {
    this.gameApp = gameApp;
    this.tools = tools;
    this.activeTool = null;
  }

  /**
   * Set the active tool. 
   * Only one tool may be active at a time.
   * 
   * @param {string} toolName 
   */
  set activeTool(toolName) {
    // Try and lookup the tool by name.
    const newTool = this.tools[`${toolName}`];
    if (newTool == null || newTool == undefined) {
      console.warn('Could not activate tool: ' + toolName);
      return;
    }

    // If we have a current tool, turn it off.
    if (this.activeTool != null) {
      this.activeTool.active = false;
      return;
    }

    // If we're trying to activate a different tool to the current one, set the
    // new reference now.
    if (this.activeTool !== newTool) {
      this.activeTool = newTool;
    }

    // Activate the new tool.
    newTool.active = true;
  }
}