import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Setup basic scene components
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a light source
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Add OrbitControls for navigation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Provides a smoother, more natural feel
controls.dampingFactor = 0.05;

// Create two separate loaders for the models
const loader1 = new GLTFLoader();

// Load the first model (building.glb)
loader1.load(
    './models/building.glb', 
    function (gltf) {
        // You can position the model here if needed
        gltf.scene.position.set(0, 0, 0); 
        scene.add(gltf.scene);
        // Center the camera on the model and zoom out for a better view
                const box = new THREE.Box3().setFromObject(gltf.scene);
                const center = box.getCenter(new THREE.Vector3());
                controls.target.copy(center);
                camera.position.set(center.x, center.y + 5, center.z + 10);
                camera.lookAt(center);
                controls.update();
        console.log('building.glb loaded successfully!');
    },
    undefined, // Optional progress function
    function (error) {
        console.error('An error happened loading building.glb', error);
    }
);


// Animate the scene
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
