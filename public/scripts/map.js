/*

    Fichier Javascript cerveau logique du jeu

*/
import { Couleurs, Direction } from './constants.js';

import { Rue } from "./rue.js";

import { Croisement } from "./croisement.js";

import { Lumiere, Lampadaire } from './lumiere.js';

class Map {

    constructor(size_x, size_y) {
        this.size_x = size_x * 2 + 1;
        this.size_y = size_y * 2 + 1;
        this.grille = this.CreeTableauNull(this.size_x, this.size_y);
    }

    CreeTableauNull(size_x, size_y) {
        let tableau = new Array(size_x);
        for (let index_x = 0; index_x < size_x; index_x++) {
            tableau[index_x] = new Array(size_y).fill(null);

        }
        return tableau;
    }

    OffsetToDirection(offset_x, offset_y) {
        if (offset_x == 0 && (offset_y == 1 || offset_y == -1)) {
            return Direction.NORD;
        }
        if (offset_x == 1 && offset_y == 1 || offset_x == -1 && offset_y == -1) {
            return Direction.SUD_EST;
        }
        if ((offset_x == 1 || offset_x == -1) && offset_y == 0) {
            return Direction.EST;
        }
        if (offset_x == -1 && offset_y == 1 || offset_x == 1 && offset_y == -1) {
            return Direction.NORD_EST;
        }
        throw new console.error('Direction non reconnu');
    
    }

    //Méthode de construction
    AjoutCroisement(position_x, position_y) {
        /// Est ce qu'il y a une place de libre  ? important ca non ? 

        if (this.grille[position_x][position_y] != null) {
            ///loupé, plein
            return false;
        }

        let croisement = new Croisement(position_x, position_y);
        this.grille[position_x][position_y] = croisement;
        return true;
    }

    AffichageConsole() {

        console.log("Affichage de la carte\n");
        for (let index_y = 0; index_y < this.size_y; index_y++) {

            let string = '#';
            for (let index_x = 0; index_x < this.size_x; index_x++) {


                if (this.grille[index_x][index_y] === null) {
                    string += ' ';
                } else if (this.grille[index_x][index_y] instanceof Rue) {
                    let direction = this.grille[index_x][index_y].direction;

                    switch (direction) {
                        case Direction.NORD:
                            string += '|';
                            break;
                        case Direction.NORD_EST:
                            string += '/';
                            break;
                        case Direction.EST:
                            string += '-';
                            break;
                        case Direction.SUD_EST:
                            string += '\\';
                            break;
                        default:
                            break;
                    }
                }
                else if (this.grille[index_x][index_y] instanceof Croisement) {
                    string += '@';
                }


            }
            string += '#';
            console.log(string);
            string = "";

        }
    }


    IsNull(x, y) {
        return this.grille[x][y] == null;
    }

    IsDefined(x, y) {
        if(this.grille[x] != undefined)
        {
            return this.grille[x][y] != undefined;
        }
        return false;
    }





    //Méthode de construction
    AjoutRue(position_x, position_y, direction) {
        /// Est ce qu'il y a une place de libre  ? important ca non ? 

        if (this.grille[position_x][position_y] != null) {
            ///loupé, plein
            return false;
        }

        let rue = new Rue(position_x, position_y, direction);
        this.grille[position_x][position_y] = rue;
        return true; IsCaseCroisement
    }


    Verification() {
        for (let index_x = 0; index_x < this.size_x; index_x++) {

            for (let index_y = 0; index_y < this.size_y; index_y++) {


                if (!this.IsNull(index_x, index_y) && !this.grille[index_x][index_y].Verification())
                {
                    console.log('Verification échoué a : ' + index_x + ' ' + index_y);
                    return false;
                }

            }
        }
        return true;
    }



    AjoutLampadaire(x, y, lampadaire) {
        if (this.grille[x] == undefined || this.grille[x][y] == undefined) false;

        if (this.grille[x][y] == null) return false;
        if (!this.grille[x][y] instanceof Croisement) return false;

        if (!this.grille[x][y].AjoutLampadaire(lampadaire)) return false;

        // Propagation de la lumiere


        let lumiere = lampadaire.CreeLumiere();


        const PropagationLumiere = (starting_x, starting_y, offset_x, offset_y, lumiere) => {
            let x = starting_x + offset_x;
            let y = starting_y + offset_y;
            let direction_reference = this.OffsetToDirection(offset_x, offset_y);


            while (this.IsDefined(x, y) && !this.IsNull(x, y) && (!(this.grille[x][y] instanceof Rue) || this.grille[x][y].direction == direction_reference)) {

                this.grille[x][y].AjoutLumiere(lumiere);
                x += offset_x;
                y += offset_y;

            }
        }

        PropagationLumiere(x, y, 0, 1, lumiere);
        PropagationLumiere(x, y, 1, 1, lumiere);
        PropagationLumiere(x, y, 1, 0, lumiere);
        PropagationLumiere(x, y, 1, -1, lumiere);
        PropagationLumiere(x, y, 0, -1, lumiere);
        PropagationLumiere(x, y, -1, -1, lumiere);
        PropagationLumiere(x, y, -1, 0, lumiere);
        PropagationLumiere(x, y, -1, 1, lumiere);





    }

    SupprimeLampadaire(lampadaire, x, y) {
        if (this.grille[x] == undefined || this.grille[x][y] == undefined) false;

        if (this.grille[x][y] == null) return false;
        if (!this.grille[x][y] instanceof Croisement) return false;

        if (!this.grille[x][y].SupprimeLumiere(lampadaire)) return false;

        // Propagation de la lumiere

        let lumiere = lampadaire.CreeLumiere();

        function PropagationLumiere(starting_x, starting_y, offset_x, offset_y, lumiere) {
            let x = starting_x + offset_x;
            let y = starting_y + offset_y;
            let direction_reference = OffsetToDirection(offset_x, offset_y);

            while (!IsNull(x, y) && IsDefined(x, y) && (!(this.grille[x][y] instanceof Rue) || this.grille[x][y].direction == direction_reference)) {

                this.grille[x][y].SupprimeLumiere(lumiere);
            }
        }

        PropagationLumiere(x, y, 0, 1, lumiere);
        PropagationLumiere(x, y, 1, 1, lumiere);
        PropagationLumiere(x, y, 1, 0, lumiere);
        PropagationLumiere(x, y, 1, -1, lumiere);
        PropagationLumiere(x, y, 0, -1, lumiere);
        PropagationLumiere(x, y, -1, -1, lumiere);
        PropagationLumiere(x, y, -1, 0, lumiere);
        PropagationLumiere(x, y, -1, 1, lumiere);


    }


    
}

//// Faire une fonction pour lire le format JSON d'envoie 


//// Faire une fonction qui permet de savoir ce qu'il y a a l'emplacement x / y 
/// Réponse possible => croissement, couleur(s), lampadaire
/// rue, couleur
/// vide



/// programme de teste 




let map = new Map(3, 2);


map.AjoutCroisement(1, 1);
map.AjoutCroisement(1, 3);
map.AjoutCroisement(3, 1);
map.AjoutCroisement(5, 1);

map.AjoutRue(1, 0, Direction.NORD);
map.AjoutRue(1, 2, Direction.NORD);

map.AjoutRue(2, 2, Direction.NORD_EST);

map.AjoutRue(4, 1, Direction.EST);
map.AjoutRue(6, 1, Direction.EST);

map.AjoutRue(5, 0, Direction.NORD);

console.log(map.Verification());

let premier_lampadaire = new Lampadaire(0, Couleurs.BLEU);
let second_lampadaire = new Lampadaire(1, Couleurs.BLEU);

map.AjoutLampadaire(1, 3, premier_lampadaire)
map.AjoutLampadaire(5, 1, second_lampadaire);

console.log(map.Verification());

map.SupprimeLampadaire(premier_lampadaire, 1, 3);

console.log(map.Verification());


map.AffichageConsole();




