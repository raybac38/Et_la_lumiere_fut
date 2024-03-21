import * as THREE from '/three.js';


import * as TERRAIN from './scripts/terrain.js';

console.log("JS charger");

// Setup de THREE JS

var container = document.getElementById("Scene");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight,0.1, 1000);

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


function animate(){
    requestAnimationFrame(animate);
    console.log("Une nouvelle secne");
    directionallight.rotation.x += 0.03;
    renderer.render(scene, camera);
}

animate();

