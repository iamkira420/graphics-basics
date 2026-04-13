import * as THREE from 'three';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const color = 0xFFFFFF;
const intensity = 5;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

function render(time) {
    const canvas = renderer.domElement;

    if (resizeRendererToDisplaySize(renderer)) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    cube.rotation.x = time / 2000;
    cube.rotation.y = time / 1000;

    renderer.render(scene, camera);
}

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

renderer.setAnimationLoop(render);
