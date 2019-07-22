import {
  Scene,
  BoxGeometry,
  WebGLRenderer,
  OrthographicCamera,
  PerspectiveCamera,
  MeshBasicMaterial,
  MeshStandardMaterial,
  DirectionalLight,
  AmbientLight,
  HemisphereLight,
  DoubleSide,
  PlaneGeometry,
  Mesh, } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { StateMachine } from 'javascript-state-machine';

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
    this.controls.minZoom = 15;

    // Initialise scene and add camera.
    this.scene = new Scene();
    this.scene.add(this.camera);
    
    //controls.update() must be called after any manual changes to the camera's transform
    this.camera.position.set(30, 25, 30);
    this.camera.zoom = 25;
    this.camera.updateProjectionMatrix();
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
    var boxGeometry = new BoxGeometry(50, 50, 1);
    var basicMaterial = new MeshStandardMaterial({ color: 0x666666 });
    // basicMaterial.roughness = 1; // attenuates roughnessMap
    // basicMaterial.metalness = 1;

    var directionalLight = new DirectionalLight(0xFFFFFF, 1);
    directionalLight.position.set( 100, 350, 250 );
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

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