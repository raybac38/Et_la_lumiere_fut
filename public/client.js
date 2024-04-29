import * as THREE from '/three.js'

import * as MAP from './scripts/map.js';

// Event listeneer

import { InitEvent } from './scripts/eventManager.js'
InitEvent();

// Initialisation de la scène Three.js
var container = document.getElementById("Scene");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, container.clientWidth / container.clientHeight ,0.1, 1000);

var renderer = new THREE.WebGLRenderer( { antialias: false });
renderer.setSize( container.clientWidth, container.clientHeight );
container.appendChild(renderer.domElement);

/// Initialisaion de la lumièere

const ambiantlight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambiantlight);


/// position initiale de la camera

camera.rotation.x = -90 * (Math.PI / 180);

/// rendu

scene.background = new THREE.Color(0xeee8d5);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

renderer.render(scene, camera);



////Socket io 


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();

MAP.MapInit();



//// exportation

export {scene, camera, renderer, container} 
