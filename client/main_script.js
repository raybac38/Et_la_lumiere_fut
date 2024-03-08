import * as THREE from './three/three.module.js';
//import { generate_terrain_block } from './render_script/terrain';

console.log("JS charger");

// Setup de THREE JS

var container = document.getElementById("Scene");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight,0.1, 1000);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize( container.clientWidth, container.clientHeight );
container.appendChild(renderer.domElement);

///Limière

const light = new THREE.AmbientLight(0xff0000, 0.5); 
scene.add(light);






/// Hello world




const geometry = new THREE.BoxGeometry( 1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
const cube = new THREE.Mesh( geometry, material );
cube.name = "co";

scene.add( cube );

//scene.add = generate_terrain_block();

camera.position.z = 5;


/// Skybox


/// Rendu

function animate(){
    requestAnimationFrame(animate);
    console.log("Une nouvelle secne");
    renderer.render(scene, camera);
}

animate();

export { scene as SCENE}