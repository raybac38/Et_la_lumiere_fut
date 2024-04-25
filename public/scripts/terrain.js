
import * as THREE from '/three.js';


const bottom_face_value = -20;

function generate_base_tuile(hauteur, name)
{
    console.log("generate_tuile");
	var geometry = new THREE.BufferGeometry();

    var verticies = new Float32Array([
        0, hauteur, 0,
        0, hauteur, 1,
        1, hauteur, 1,

        0, hauteur, 0,
        1, hauteur, 1,
        1, hauteur, 0,

        0, bottom_face_value, 1,
        1, hauteur, 1,
        0, hauteur, 1,

        0, bottom_face_value, 1,
        1, bottom_face_value, 1,
        1, hauteur, 1,

        0, bottom_face_value, 0,
        0, hauteur, 0,
        1, hauteur, 0,

        0, bottom_face_value, 0,
        1, hauteur, 0,
        1, bottom_face_value, 0,

        0, bottom_face_value, 0,
        1, bottom_face_value, 1,
        0, bottom_face_value, 1,

        0, bottom_face_value, 0,
        1, bottom_face_value, 0,
        1, bottom_face_value, 1,

        0, bottom_face_value, 0,
        0, hauteur, 1,
        0, hauteur, 0,

        0, bottom_face_value, 0,
        0, bottom_face_value, 1,
        0, hauteur, 1,  

        1, bottom_face_value, 0,
        1, hauteur, 0,
        1, hauteur, 1,

        1, bottom_face_value, 0,
        1, hauteur, 1,
        1, bottom_face_value, 1


    ])

    var indices = [
        
        0, 1, 2,
        3, 4, 5,

        6, 7, 8,
        9, 10, 11,

        12, 13, 14,
        15, 16, 17,

        18, 19, 20,
        21, 22, 23,

        24, 25, 26,
        27, 28, 29,

        30, 31, 32, 
        33, 34, 35
    ]

    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.BufferAttribute(verticies, 3));
    geometry.computeVertexNormals(); 

    var material = new THREE.MeshStandardMaterial({});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    return mesh;

}







function generate_terrain_block()
{
    var geometry = new THREE.BufferGeometry();

    var verticies = new Float32Array([
        0.5, 0, 0.5,
        0.5, 0, -0.5,
        -0.5, 0, 0.5,
        -0.5, 0, -0.5,

        0.5, -10, 0.5,
        0.5, -10, -0.5,
        -0.5, -10, 0.5,
        -0.5, -10, -0.5,
    ])
    var indices = [
        3, 0, 1,
        3, 2, 0,

        7, 6, 4,
        7, 4, 8
    ]

    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.BufferAttribute(verticies,3));
    var material = new THREE.MeshNormalMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
}




export {generate_terrain_block, generate_base_tuile};
