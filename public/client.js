import * as THREE from '/three.js'

import * as TERRAIN from './scripts/terrain.js';


// Connexion au serveur via Socket.IO
const socket = io();

// Initialisation de la scène Three.js
var container = document.getElementById("Scene");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, container.clientWidth / container.clientHeight,0.1, 1000);

const renderer = new THREE.WebGLRenderer();
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

camera.position.z = 6;
camera.position.y = 2;
camera.rotation.x = -35 * (Math.PI / 180);

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

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render(scene, camera);
}


/// UI


const button_generate_new_map = document.getElementById("new_map");
const drop_box_buttons_prefab = document.getElementsByClassName("prefab_map");
const button_solve = document.getElementById("solve");
const drop_box_value = document.getElementById("maps");

var input_field_map_size_x = document.getElementById("taille_x");
var input_field_map_size_y = document.getElementById("taille_y");

button_generate_new_map.addEventListener('click', () => {
    Request_New_Map(input_field_map_size_x.value, input_field_map_size_y.value);
});

button_solve.addEventListener('click', () =>
{
    Request_Solve();
});

for (let i = 0; i < drop_box_buttons_prefab.length; i++) {
    drop_box_buttons_prefab[i].addEventListener('click', () => {
        Request_Prefab_Map(drop_box_value.options[drop_box_value.selectedIndex].text);
    });
}



////Socket io 

function Request_New_Map(size_x, size_y)
{
    socket.emit('request_new_map', size_x, size_y);
}

function Request_Prefab_Map(numero)
{
    socket.emit('request_prefab_map', numero)
    console.log('request prefab map');
}

function Request_Solve()
{
    console.log('request solve');
    
}
