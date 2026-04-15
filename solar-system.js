import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1); 
camera.lookAt(0, 0, 0); 

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// an array of objects whose rotation to update
const objects = [];

// use just one sphere for everything
const radius = 1;
const widthSegments = 64;
const heightSegments = 32;
const sphereGeometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments
);

const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xffff00, flatShading: true, shininess: 130, wireframe: true});
const sunMesh =  new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5); // make the sun large
// scene.add(sunMesh);
solarSystem.add(sunMesh);
objects.push(sunMesh);

// adding the moon
const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 13;
solarSystem.add(earthOrbit);
objects.push(earthOrbit);

const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, shininess: 30, emissive: 0x112244, wireframe: true});
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
// earthMesh.position.x = 13;
earthMesh.scale.set(2.5, 2.5, 2.5); // make the earth smaller
//sunMesh.add(earthMesh);
// solarSystem.add(earthMesh);
earthOrbit.add(earthMesh);
objects.push(earthMesh);

const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 4;
earthOrbit.add(moonOrbit);

const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, shininess: 30, emissive: 0x222222, wireframe: true});
const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
moonMesh.scale.set(1, 1, 1); // make the moon smaller
moonOrbit.add(moonMesh);
objects.push(moonMesh);

{
    const color = 0xFFFFFF;
    const intensity = 500;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);
}

function resizeRendererToDisplaySize( renderer ) {
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needResize = canvas.width !== width || canvas.height !== height;

	if ( needResize ) {
		renderer.setSize( width, height, false );
	}
	return needResize;
}

// function to handle rotations
function render( time ) {
	time *= 0.001;
	if ( resizeRendererToDisplaySize( renderer ) ) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}

	objects.forEach( ( obj ) => {
		obj.rotation.y = time;
        //obj.rotation.x += time;
	} );

	renderer.render( scene, camera );
	requestAnimationFrame( render );
}

requestAnimationFrame( render );
