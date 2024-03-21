
import * as THREE from '/three.js';


const bottom_face_value = -20;

function generate_tuile(hauteur, name)
{
    console.log("generate_tuile");
	var geometry = new THREE.BufferGeometry();

    var verticies = new Float32Array([
        0, bottom_face_value, 0,    // a 0
        1, bottom_face_value, 0,    // b 1
        1, hauteur, 0,    // c 2
        0, hauteur, 0,    // d 3

        0, bottom_face_value, 1,    // e 4
        1, bottom_face_value, 1,    // f 5
        1, hauteur, 1,    // g 6
        0, hauteur, 1     // h 7
    ])

    var indices = [
        //face du bas
        0, 1, 2,
        0, 2, 3,

        //face du devant
        0, 4, 5,
        0, 5, 1,

        //face arriere
        3, 2, 6,
        3, 6, 7,

        //face du haut
        4, 7, 6,
        4, 6, 5,

        //face de droite
        1, 5, 6,
        1, 6, 2,

        //face de gauche
        0, 3, 7,
        0, 7, 4
    ]

    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.BufferAttribute(verticies, 3));
    var material = new THREE.MeshPhysicalMaterial({color: 0xaaaaaa});
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

export {generate_terrain_block, generate_tuile};
