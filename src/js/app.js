import {
  Scene,
  BoxGeometry,
  WebGLRenderer,
  PerspectiveCamera,
  MeshBasicMaterial,
  AmbientLight,
  HemisphereLight,
  DoubleSide,
  PlaneGeometry,
  Mesh, } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { StateMachine } from 'javascript-state-machine';

// UI imports. Needed to register web components.
import './uiRoot';
import './uiRootButton';

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

    // Setup renderer.
    const sceneWidth = window.innerWidth,
          sceneHeight = window.innerHeight;

    this.renderer = new WebGLRenderer(rendererOptions);
    this.renderer.setClearColor(0xDDDDDD, 1);
    this.renderer.setSize(sceneWidth, sceneHeight);

    // Setup camera.
    const cameraFov = 75.0,
          cameraAspectRatio = sceneWidth / sceneHeight,
          cameraNearDistance = 0.1,
          cameraFarDistance = 1000,
          cameraDefaultDistance = 50;
    this.camera = new PerspectiveCamera(cameraFov, cameraAspectRatio,
                                        cameraNearDistance, cameraFarDistance);
    this.camera.position.z = cameraDefaultDistance;

    // Setup orbit controls.
    const orbitZoomSpeed = 5.0,
          orbitPanSpeed = 0.0, // disable pan
          orbitMaxDistance = 100,
          orbitMinDistance = 30;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = true;
    this.controls.zoomSpeed = orbitZoomSpeed;
    this.controls.panSpeed = orbitPanSpeed;
    this.controls.maxDistance = orbitMaxDistance;
    this.controls.minDistance = orbitMinDistance;

    // Initialise scene and add camera.
    this.scene = new Scene();
    this.scene.add(this.camera);

    //controls.update() must be called after any manual changes to the camera's transform
    this.camera.position.set(0, 20, 30);
    this.controls.update();
    
    this.addDemoScene();
    this.uiRootReference = document.querySelector('ui-root');
    this.uiRootReference.setContext(this);
    this.uiRootReference.appendChild(this.renderer.domElement);
    
    requestAnimationFrame(() => this.doFrame());
  }

  /**
   * Add demo objects to the scene.
   */
  addDemoScene() {
    var boxGeometry = new BoxGeometry(40, 40, 2);
    var basicMaterial = new MeshBasicMaterial({ color: 0x0095DD });

    var plane = new Mesh(boxGeometry, basicMaterial);
    plane.rotateX(Math.PI / 2);
    this.scene.add(plane);
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
    this.controls.update();
  }
}

export { GameApp as App }
window.game = new GameApp();