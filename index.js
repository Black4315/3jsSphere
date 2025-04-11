import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();

renderer.setSize(w, h); // setSize of renderer
document.body.appendChild(renderer.domElement); // appendChild renderer canvas

// geometry
const geo = new THREE.IcosahedronGeometry(1.0, 2);

// mesh
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff, // Color   
  flatShading: true,
});
const ball = new THREE.Mesh(geo, mat);
scene.add(ball);

// wireframe material
const wiremat = new THREE.MeshBasicMaterial({
  color: 0xffffff,  // Wireframe color as white
  wireframe: true,  // Enable wireframe rendering
});
const wire = new THREE.Mesh(geo, wiremat);
wire.scale.setScalar(1.001); // Slightly scale to sit on top of the mesh
ball.add(wire);

// light
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xe74c3c, 1); // Blue sky color (0x0099ff), greenish ground color (0x00CC33), intensity of 1
scene.add(hemiLight);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.063;

// Animation loop
function animate(t = 0) {
  requestAnimationFrame(animate);
  ball.rotation.y = t * 0.0001;  // Rotate object to make it animate
  ball.rotation.x = t * 0.0001;  // Rotate object to make it animate
  renderer.render(scene, camera); // render scene camera
  controls.update()

}

animate();
