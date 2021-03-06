import {
  Scene,
  BoxGeometry,
  WebGLRenderer,
  OrthographicCamera,
  PerspectiveCamera,
  MeshBasicMaterial,
  MeshStandardMaterial,
  DirectionalLight,
  GridHelper,
  AmbientLight,
  HemisphereLight,
  DoubleSide,
  PlaneGeometry,
  Mesh, } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { StateMachine } from 'javascript-state-machine';

import { CGameEntity } from './gameEntity';
import { CGameToolManager } from './gameToolManager';
import { CRoomFoundationBuildTool } from './tools/roomFoundationBuildTool';
import { CRoomFoundations } from './roomFoundations';

// UI imports. Needed to register web components.
import './uiRoot';
import './uiLoading';
import './uiRootButton';
import './uiMenuPanel';
import './uiStats';
import './uiToast';

/**
 * Entry-point for application. 
 * 
 * Responsible for bootstrapp/teardown of all major systems, management of game
 * loop, dispatching events and keeping track of entities.
 */
class GameApp
{
  /**
   * Initialise various subsystems: renderer, camera, input, etc..
   * 
   * @param {*} rendererOptions Render options passed to THREE.WebGLRenderer.
   */
  constructor(rendererOptions = { antialias: true }) {
    console.log('Hello, world!');

    console.log('Registering service worker');
    if (navigator.serviceWorker && !navigator.serviceWorker.controller) {
      navigator.serviceWorker.register('/static/serviceWorker.js');
    }

    // Setup renderer.
    const sceneWidth = window.innerWidth,
          sceneHeight = window.innerHeight;

    this.renderer = new WebGLRenderer(rendererOptions);
    this.renderer.setClearColor(0xA9BED4, 1);
    this.renderer.setSize(sceneWidth, sceneHeight);

    // Setup camera.
    const cameraFov = 75.0,
          cameraAspectRatio = sceneWidth / sceneHeight,
          cameraNearDistance = 0.1,
          cameraFarDistance = 1000;
    this.camera = new OrthographicCamera(
      sceneWidth / - 2, sceneWidth / 2,
      sceneHeight / 2, sceneHeight / - 2,
      cameraNearDistance,
      cameraFarDistance);

    // Setup orbit controls.
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = true;
    this.controls.enablePan = false;
    this.controls.zoomSpeed = 1.0;
    this.controls.maxZoom = 80;
    this.controls.minZoom = 30;

    // Initialise scene and add camera.
    this.scene = new Scene();
    this.scene.add(this.camera);
    
    //controls.update() must be called after any manual changes to the camera's transform
    this.camera.position.set(30, 25, 30);
    this.camera.zoom = 15;
    this.camera.updateProjectionMatrix();
    this.controls.update();

    this.uiRootReference = document.querySelector('ui-root');
    this.uiRootReference.setContext(this);
    this.uiRootReference.appendChild(this.renderer.domElement);

    this.uiToastReference = document.querySelector('#toast-build-room');
    this.uiToastReference.setAttribute('visible', 'true');
    
    // Add default stuff to the scene.
    this.addDefaultScene();

    // Initialise gameplay systems.
    // Create the root game entity.
    this.rootEntity = new CGameEntity(null, 'RootEntity', this);
    this.roomFoundations = new CRoomFoundations(this.rootEntity);
    // this.roomFoundations.addRoom();
    // this.testEntity = new CGameEntity(this.rootEntity);
    
    requestAnimationFrame(() => this.doFrame());

    const self = this;
    const tools = {
      'roomFoundationBuild': new CRoomFoundationBuildTool(self.roomFoundations),
    };
    this.gameToolManager = new CGameToolManager(this, tools);
    this.gameToolManager.activeTool = 'roomFoundationBuild';

    // Pause before starting.
    setTimeout(() => {
      const uiLoadingReference = document.querySelector('ui-loading');
      uiLoadingReference.loaded = true; // removes the loader
      setTimeout(() => uiLoadingReference.parentNode.removeChild(uiLoadingReference), 1200); // Wait 5 seconds.
    }, 1000);
    requestAnimationFrame(() => self.doFrame());
  }

  printGameEntities() {
    console.log(this.rootEntity.children);
  }

  /**
   * Add demo objects to the scene.
   */
  addDefaultScene() {
    const light = new AmbientLight(0x404040);
    this.scene.add(light);

    var directionalLight = new DirectionalLight(0xFFFFFF, 1);
    directionalLight.position.set(0, 5, 5);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);
  }

  doFrame() {
    requestAnimationFrame(() => this.doFrame());
    this.doUpdates();
    this.doRender();
  }

  /**
   * Render the scene.
   */
  doRender() {
    this.renderer.render(this.scene, this.camera);
  }
  
  /**
   * Process all updates.
   */
  doUpdates() {
    // Update root entity, and all children recursively.
    this.rootEntity.update();
    this.controls.update();
  }
}

export { GameApp as App }
window.game = new GameApp();
