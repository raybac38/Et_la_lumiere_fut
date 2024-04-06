import * as THREE from '/three.js';


function Create_croisement(id)
{
    let cylinder_geometry = new THREE.CylinderGeometry();

    let cylindre_material = new THREE.MeshStandardMaterial({ color : 0xdddddd});

    let cylinder_mesh = new THREE.Mesh(cylinder_geometry, cylindre_material);

    return cylinder_mesh;
}