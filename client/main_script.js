import * as THREE from '/three.js';


import * as TERRAIN from './scripts/terrain.js';



var socket = io();


console.log("JS charger");

// Setup de THREE JS

var container = document.getElementById("Scene");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, container.clientWidth / container.clientHeight,0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( container.clientWidth, container.clientHeight );
container.appendChild(renderer.domElement);


///Limière

const ambiantlight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambiantlight);

const directionallight = new THREE.DirectionalLight(0xaaaaaa, 2.5); 
directionallight.castShadow = true;

directionallight.position.set( 1, 2, 1 ).setLength( 10 );
scene.add(directionallight);


const helper = new THREE.DirectionalLightHelper(directionallight);
scene.add(helper);

/// Hello world


var taillex = 8;
var tailley = 8;

let id = 0;

for (let index_x = 0; index_x < taillex; index_x++) 
{
    for(let index_y = 0; index_y <tailley; index_y++)
    {
        let obj = TERRAIN.generate_tuile(0,5, id);
        id++;
        obj.position.set(index_x - 0.5*taillex, -2, index_y - 0.5*tailley);
        obj.scale.set(0.9, 1, 0.9);
        obj.castShadow = true;
        obj.receiveShadow = true;
        scene.add(obj);
    }
}


//scene.add = generate_terrain_block();

camera.position.z = 6;
camera.position.y = 2;
camera.rotation.x = -35 * (Math.PI / 180);


/// Skybox


/// Rendu

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;


renderer.render(scene, camera);


////////


// UI INPUT

const button_generate_new_map = document.getElementById("new_map");
const drop_box_buttons_prefab = document.getElementsByClassName("prefab_map");
const button_solve = document.getElementById("solve");
const drop_box_value = document.getElementById("maps");

const input_field_map_size_x = document.getElementById("taille_x");
const input_field_map_size_y = document.getElementById("taille_y");

button_generate_new_map.addEventListener('click', () => {
    Request_New_Map();
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






//////Socket IO


////emition

function Request_New_Map()
{
    socket.emit('request_new_map');
}

function Request_Solve()
{
    socket.emit('solve');
}
function Request_Prefab_Map(map_name)
{
    socket.emit('request_prefab_map', map_name);
}
