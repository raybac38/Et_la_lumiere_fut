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
        this.geometry_octo = null;
        this.geometry_torus = null;

        this.GenerationMesh();
        this.ColorUpdate()
    }

    /// Fonction en charge de la génération et de l'ajout dans la scene du croisement
    GenerationMesh() {

        let geometry_octo = new THREE.BufferGeometry();
        geometry_octo.setIndex(hexa_raw_data.triangles);
        geometry_octo.setAttribute('position', new THREE.BufferAttribute(hexa_raw_data.verticies, 3));

        this.geometry_torus = new THREE.TorusGeometry(2, 0.75, 4, 16);

        let material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        let mesh = new THREE.Mesh(geometry_octo, material);
        mesh.scale.set((1 / 3), 1, (1 / 3));

        this.name = 'c:' + this.position_x + ':' + this.position_y;
        mesh.name = this.name;

        this.geometry_octo = geometry_octo;
        this.material = material;
        this.mesh = mesh;

        scene.add(mesh);
        mesh.position.set(this.position_x, 0, this.position_y);
    }

    // Changement de mesh lors de l'ajout d'un lampadaire
    ChangeMesh(has_lampadaire)
    {
        scene.remove(this.mesh);

        let mesh = null;
        if(has_lampadaire)
        {
            mesh = new THREE.Mesh(this.geometry_torus, this.material);
            mesh.rotation.x = Math.PI / 2;
            mesh.scale.set((1 / 4), (1/4), (1/6));

        }
        else
        {
            mesh = new THREE.Mesh(this.geometry_octo, this.material);
            mesh.rotation.x = 0;
            mesh.scale.set((1 / 3), 1, (1 / 3));

        }
        this.mesh = mesh;
        mesh.name = this.name;

        scene.add(mesh);
        mesh.position.set(this.position_x, 0, this.position_y);

    }

    // Suprimer la mesh de la scene
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

    // Renvoe la lanterne
    GetLampadaire()
    {
        return this.lampadaire;
    }

    AjouterLampadaire(lampadaire) {
        if (this.lampadaire == null) {
            this.lampadaire = lampadaire;
            this.ChangeMesh(true);
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
            this.ChangeMesh(false);
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

    /// Mise a jour de la couleur du croisement
    ColorUpdate()
    {
        let taille =  this.lumieres.length;
        if(taille == 0)
        {
            this.material.color.set(CouleurHexa.gris)
        }
        else
        {
            let couleur = this.lumieres[taille - 1].GetColor();
            this.material.color.set(CouleurHexa[couleur]);
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