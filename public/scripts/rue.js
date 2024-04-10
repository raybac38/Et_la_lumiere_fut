import * as THREE from '/three.js'
import { scene } from "../client.js"
import { Direction } from './constants.js';

export class Rue {
    constructor(position_x, position_y, direction) {
        this.position_x = position_x;
        this.position_y = position_y;

        this.direction = direction;
        this.lumieres = [];
        
        /// Partie 3D
        this.geometry = null;
        this.mesh = null;
        this.material = null;

        this.GenerationMesh();

    }

    GenerationMesh()
    {
        
        /*
        Particuliarité des Rues, il y a deux mesh différente : vertical pour diagonal
        De plus, une rotation de 0, 90, 180, ou 270 degres est attendu
        */

        let geometry = new THREE.BufferGeometry();

        if(this.direction == Direction.NORD || this.direction == Direction.EST)
        {
            // Forme droite, comme la justice ! 

            geometry.setIndex(droit_raw_data.triangles);
            geometry.setAttribute('position', new THREE.BufferAttribute( droit_raw_data.verticies, 3));


        }
        else
        {
            // Inclinaison attendu
            geometry.setIndex(diagonal_raw_data.triangles);
            geometry.setAttribute('position', new THREE.BufferAttribute( diagonal_raw_data.verticies, 3));
    

        }


        

        let material = new THREE.MeshStandardMaterial( { color : 0xffffff});
        let mesh = new THREE.Mesh(geometry, material);


        mesh.scale.set(1/4, 1, 1/4);

        if(this.direction == Direction.EST || this.direction == Direction.SUD_EST)
        {
            mesh.rotation.y = 90 * (Math.PI / 180);
        }

        this.name = 'r:' + this.position_x + ':' + this.position_y;
        
        this.geometry = geometry;
        this.material = material;
        this.mesh = mesh;

        scene.add(mesh);
        mesh.position.set(this.position_x, 0, this.position_y);
    }


    AjoutLumiere(lumiere) {
        this.lumieres.push(lumiere);
    }

    SupprimeLumiere(lumiere) {
        let indice = this.lumieres.indexOf(lumiere);
        if (index != -1) {
            this.lumieres.splice(indice, 1);
        }
    }

    Verification() {
        return this.lumieres.length == 1;
    }


}


class diagonal_raw_data
{
    static verticies = new Float32Array([
        0.5, 0, -1.5,
        1.5, 0, -0.5,
        1.5, 0, -1.5,
    
        0.5, 0, -1.5,
        -0.5, 0, 1.5,
        1.5, 0, -0.5,
    
        0.5, 0, -1.5,
        -1.5, 0, 0.5,
        -0.5, 0, 1.5,
        
        -1.5, 0, 0.5,
        -1.5, 0, 1.5,
        -0.5, 0, 1.5
    ]);

    static triangles = 
    [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8,
        9, 10, 11
    ]
}

class droit_raw_data
{
    static verticies = new Float32Array(
        [
            -0.5, 0, -1.5,
            -0.5, 0, 1.5,
            0.5, 0, -1.5,

            0.5, 0, -1.5,
            -0.5, 0, 1.5,
            0.5, 0, 1.5
        ]
    )
    static triangles = 
    [
        0, 1, 2,
        3, 4, 5
    ]
}








