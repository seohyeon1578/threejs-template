import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//canvas
const canvas = document.querySelector('canvas.webgl');

//div
//const divContainer = document.getElementById("webgl");

//scene
const scene = new THREE.Scene();

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//resize
window.addEventListener('resize', () => {
  
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(1, 1, 1);
scene.add(camera);

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


//geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

//material
const material = new THREE.MeshBasicMaterial({ color: 0x44a88 });

//cube
const cube = new THREE.Mesh(geometry,material);
scene.add(cube);

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();
let lastElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - lastElapsedTime;
  lastElapsedTime = elapsedTime;

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
}

tick();
