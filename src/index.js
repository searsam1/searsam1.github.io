import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Detect if the user is on a mobile device
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

// const renderer = new THREE.WebGLRenderer();
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas')});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
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

const starCount = isMobile ? 6000 : 20000; // fewer stars on mobile
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



// Set star size
const starSize = isMobile ? 10: 3; // larger size for mobile, smaller for desktop
const starTexture = new THREE.TextureLoader().load('/images/star_texture5.png'); // Load the texture


const starMaterial = new THREE.PointsMaterial({
    size: starSize,
    map: starTexture,
    transparent: true, 
    vertexColors: true,
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

document.addEventListener('mousemove', function(e) {
    const highlight = document.getElementById('cursor-highlight');
    // Update the position of the highlight element to follow the cursor
    highlight.style.left = e.pageX + 'px';
    highlight.style.top = e.pageY + 'px';
});

document.addEventListener('mousemove', function(e) {
    const highlight = document.getElementById('cursor-highlight');
    const contactSection = document.querySelector('.contact');

    // Update the position of the highlight element
    highlight.style.left = e.pageX + 'px';
    highlight.style.top = e.pageY + 'px';

    // Check if the cursor is over the contact section
    if (contactSection && contactSection.contains(e.target)) {
        highlight.classList.add('cursor-glow');
    } else {
        highlight.classList.remove('cursor-glow');
    }
});
document.addEventListener('mousemove', (e) => {
    let trail = document.createElement('div'); // Create a new trail element
    trail.classList.add('trail'); // Add the 'trail' class
    document.body.appendChild(trail); // Append the trail to the body

    // Position the trail at the cursor's position
    trail.style.left = `${e.pageX - 5}px`; // Offset by half the size of the trail to center it
    trail.style.top = `${e.pageY - 5}px`;

    // Gradually fade out the trail element
    let fadeEffect = setInterval(() => {
        if (!trail.style.opacity) {
            trail.style.opacity = 1;
        }
        if (trail.style.opacity > 0) {
            trail.style.opacity -= 0.2;
        } else {
            clearInterval(fadeEffect);
            document.body.removeChild(trail); // Remove the trail from the document
        }
    }, 50); // Adjust time for faster or slower fade
});
