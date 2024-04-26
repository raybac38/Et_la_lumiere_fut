import * as THREE from '/three.js';

import { CouleurHexa , Couleurs } from './constants.js'

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
        this.ColorUpdate()
    }

    /// Fonction en charge de la génération et de l'ajout dans la scene du croisement
    GenerationMesh() {

        let geometry = new THREE.BufferGeometry();
        geometry.setIndex(hexa_raw_data.triangles);
        geometry.setAttribute('position', new THREE.BufferAttribute(hexa_raw_data.verticies, 3));

        let material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set((1 / 3), 1, (1 / 3));

        this.name = 'c:' + this.position_x + ':' + this.position_y;
        mesh.name = 'c:' + this.position_x + ':' + this.position_y;

        this.geometry = geometry;
        this.material = material;
        this.mesh = mesh;

        scene.add(mesh);
        mesh.position.set(this.position_x, 0, this.position_y);
    }

    SupprimerMesh()
    {
        scene.remove(this.mesh);
    }

    /*
    True = lampadaire présent
    False = absent de lampadaire
    */
    CheckLampadaire()
    {
        return this.lampadaire != null;
    }

    GetLampadaire()
    {
        return this.lampadaire;
    }

    AjouterLampadaire(lampadaire) {
        if (this.lampadaire == null) {
            this.lampadaire = lampadaire;
            return true;
        }
        else {
            console.log("Lampadaire déjà éxistant");
            return false;
        }
    }

    SupprimerLampadaire() {
        if (this.lampadaire !== null) {
            this.lampadaire = null;
            return true;
        } else {
            console.log("Aucun lampadaire à supprimer");
            return false;
        }
    }
    

    AjouterLumiere(lumiere) {
        this.lumieres.push(lumiere);
        this.ColorUpdate();
    }

    ColorUpdate()
    {

        console.log("Croisement Color update", this.name);
        let taille =  this.lumieres.length;
        if(taille == 0)
        {
            this.material.color.set(CouleurHexa.gris)
        }
        else
        {
            let couleur = this.lumieres[taille - 1].GetColor();
            this.material.color.set(CouleurHexa[couleur]);
            console.log("nouvelle couleur ", CouleurHexa[couleur]);
        }
    }

    SupprimerLumiere(lumiere) {

        let ref_id = lumiere.GetId();
        for (let indice = 0; indice < this.lumieres.length; indice++) {
            if(this.lumieres[indice].GetId() === ref_id)
            {
                this.lumieres.splice(indice, 1);
                this.ColorUpdate();
                break;
            }
        }
    }

    Verification() {
        return ! (this.CheckLampadaire() && this.lumieres.length != 1)
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