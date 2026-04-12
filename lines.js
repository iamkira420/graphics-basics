import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    500
); // (field of view in deg, aspect ratio, near clipping plane, far clipping plane) 
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(renderer.domElement);

// create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial({color: 0x0000ff});

// geometry with vertices
const points = [];
points.push(new THREE.Vector3(-35, 0, 0));
points.push(new THREE.Vector3(0, 35, 0));
points.push(new THREE.Vector3(35, 0, 0));
points.push(new THREE.Vector3(0, -35, 0));
points.push(new THREE.Vector3(-35, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);

scene.add(line);
renderer.render(scene, camera);
