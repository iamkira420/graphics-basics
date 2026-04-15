import * as THREE from 'three';

const canvas = document.querySelector('#c');
//const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

const scene =  new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const radius = 3;
const widthSegments = 32;
const heightSegments = 16;
const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 15;

function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.02;
    //sphere.rotation.z += 0.01;
    renderer.render(scene, camera);
}

animate();