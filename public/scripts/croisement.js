import * as THREE from '/three.js';

import { scene } from '../client.js';


export class Croisement {
    constructor(position_x, position_y) {
        this.position_x = position_x;
        this.position_y = position_y;

        this.lumieres = [];
        this.lampadaire = null;


        ///Partie 3D

        this.mesh = null;
        this.material = null;
        this.geometry = null;

        this.GenerationMesh();
    }

    /// Fonction en charge de la génération et de l'ajout dans la scene du croisement
    GenerationMesh() {

        let geometry = new THREE.BufferGeometry();
        geometry.setIndex(hexa_raw_data.triangles);
        geometry.setAttribute('position', new THREE.BufferAttribute(hexa_raw_data.verticies, 3));

        let material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(1 / 4, 1, 1 / 4);

        this.name = 'c:' + this.position_x + ':' + this.position_y;

        this.geometry = geometry;
        this.material = material;
        this.mesh = mesh;

        scene.add(mesh);
        mesh.position.set(this.position_x, 0, this.position_y);
    }


    AjoutLampadaire(lampadaire) {
        if (this.lampadaire == null) {
            this.lampadaire = lampadaire;
            return true;
        }
        else {
            return false;
        }
    }

    AjoutLumiere(lumiere) {
        this.lumieres.push(lumiere);
    }

    SupprimeLumiere(lumiere) {
        let indice = this.lumieres.indexOf(lumiere);
        if (indice != -1) {
            this.lumieres.splice(indice, 1);
            return true;
        }
        return false;
    }

    SupprimeLampadaire(lampadaire) {
        this.lampadaire = null;
    }



    Verification() {

        if (this.lumieres.length == 0) {
            return this.lampadaire != null;
        }
        else {
            for (let lumiere_ref = 0; lumiere_ref < this.lumieres.length; lumiere_ref++) {

                let couleur_ref = this.lumieres[lumiere_ref].couleur;

                for (let index_lumiere = lumiere_ref + 1; index_lumiere < this.lumieres.length; index_lumiere++) {

                    if (this.lumieres[index_lumiere].couleur == couleur_ref) return false;

                }

            }
            return true;
        }

    }




}


class hexa_raw_data {
    static verticies = new Float32Array([
        0, 0, 0,
        -0.5, 0, 1.5,
        0.5, 0, 1.5,

        0, 0, 0,
        0.5, 0, 1.5,
        1.5, 0, 0.5,

        0, 0, 0,
        1.5, 0, 0.5,
        1.5, 0, -0.5,

        0, 0, 0,
        1.5, 0, -0.5,
        0.5, 0, -1.5,

        0, 0, 0,
        0.5, 0, -1.5,
        -0.5, 0, -1.5,

        0, 0, 0,
        -0.5, 0, -1.5,
        -1.5, 0, -0.5,

        0, 0, 0,
        -1.5, 0, -0.5,
        -1.5, 0, 0.5,

        0, 0, 0,
        -1.5, 0, 0.5,
        -.5, 0, 1.5,


    ]);

    static triangles =
        [
            0, 1, 2,
            3, 4, 5,
            6, 7, 8,

            9, 10, 11,
            12, 13, 14,
            15, 16, 17,

            18, 19, 20,
            21, 22, 23

        ]

}