import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    controls.update();
});

// Create stars with random colors but with fewer stars and a bit more spread out
const starGeometry = new THREE.BufferGeometry();
const starVertices = [];
const starColors = [];

const starCount = 20000; // Reduced number of stars for less busyness
for (let i = 0; i < starCount; i++) {
    const x = THREE.MathUtils.randFloatSpread(3000); // Slightly more spread out
    const y = THREE.MathUtils.randFloatSpread(3000); // Slightly more spread out
    const z = THREE.MathUtils.randFloatSpread(3000); // Slightly more spread out
    starVertices.push(x, y, z);

    const color = new THREE.Color(Math.random(), Math.random(), Math.random());
    starColors.push(color.r, color.g, color.b);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));

const starMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Automatic rotation speed
const rotationSpeed = 0.001;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Automatic rotation
    stars.rotation.x += rotationSpeed;
    stars.rotation.y += rotationSpeed;

    controls.update();

    renderer.render(scene, camera);
}

animate();
