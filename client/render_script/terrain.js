
import * as THREE from 'three';



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
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

export {generate_terrain_block};