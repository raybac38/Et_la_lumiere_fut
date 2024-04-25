import * as THREE from '/three.js'

import * as TERRAIN from './scripts/terrain.js';

import * as MAP from './scripts/map.js';

// Connexion au serveur via Socket.IO
const socket = io();

// Initialisation de la scène Three.js
var container = document.getElementById("Scene");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, container.clientWidth / container.clientHeight ,0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( container.clientWidth, container.clientHeight );
container.appendChild(renderer.domElement);

/// Initialisaion de la lumièere

const ambiantlight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambiantlight);

const directionallight = new THREE.DirectionalLight(0xaaaaaa, 2.5); 
directionallight.castShadow = true;

directionallight.position.set( 1, 2, 1 ).setLength( 10 );
scene.add(directionallight);


const helper = new THREE.DirectionalLightHelper(directionallight);
scene.add(helper);


///Hello world

/// position initiale de la camera


camera.rotation.x = -90 * (Math.PI / 180);

/// rendu

scene.background = new THREE.Color(0x2e4482);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

renderer.render(scene, camera);

// Gestion des messages du serveur
socket.on('message', (message) => {
    console.log('Message du serveur:', message);
});


/// Gestion dynamique de la fenetre

window.addEventListener('resize', onWindowResize);

function onWindowResize(){

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( container.clientWidth, container.clientHeight );
    renderer.render(scene, camera);
}


/// UI


const button_generate_new_map = document.getElementById("new_map");
const button_solve = document.getElementById("solve");

var input_field_map_size_x = document.getElementById("taille_x");
var input_field_map_size_y = document.getElementById("taille_y");
var input_field_map_density = document.getElementById("density");

button_generate_new_map.addEventListener('click', () => {
    Request_New_Map(input_field_map_size_x.value, input_field_map_size_y.value, 1 - input_field_map_density.value);
});

button_solve.addEventListener('click', () =>
{
    Request_Solve();
});


////Socket io 

function Request_New_Map(size_x, size_y, density)
{
    socket.emit('request_new_map', size_x, size_y, density);
}


function Request_Solve()
{
    console.log('request solve');
}

const map = new MAP.Map();

socket.on('map_data', (data) => 
{
    console.log('lecture de la carte de cours', data);
    map.LectureMap(data);

});


function animate() {
	requestAnimationFrame( animate );


	renderer.render( scene, camera );
}

animate();




//// exportation

export {scene, camera} 
