/*

    Fichier Javascript cerveau logique du jeu

*/
import * as THREE from '/three.js';

import { camera } from '../client.js';

import { Couleurs, Direction } from './constants.js';

import { Rue } from "./rue.js";

import { Croisement } from "./croisement.js";

import { Lumiere, Lampadaire } from './lumiere.js';

import { GetIdNumber } from './raycaster.js';

import * as CONSTANTE from './constants.js';


export class Map {

    constructor(size_x = 0, size_y = 0) {
        this.Initialisaion(size_x, size_y);
        this.solution = null;
    }
    
    /**
    *Verifie si la carte est vide
    *@return {boolean } True si vraie
    */
    IsMapEmpty() {
        return this.size_x === 0 && this.size_y === 0;
    }

    /**
     * Initialisation de la carte
     * @param {Number} taille_x 
     * @param {Number} taille_y 
     */
    Initialisaion(taille_x, taille_y) {
        this.size_x = taille_x;
        this.size_y = taille_y;
        camera.position.set(this.size_x / 2, this.size_x, this.size_y / 2);
        this.grille = this.CreeTableauNull(this.size_x, this.size_y);
    }

    /**
     * Initialisation d'un tableau vide
     * @param {Number} size_x 
     * @param {Number} size_y 
     * @returns Un tableau vide
     */
    CreeTableauNull(size_x, size_y) {
        let tableau = new Array(size_x);
        for (let index_x = 0; index_x < size_x; index_x++) {
            tableau[index_x] = new Array(size_y).fill(null);

        }
        return tableau;
    }

    /**Pass d'un offset a une Direction
     * @param {Number} offset_x 
     * @param {Number} offset_y 
     * @returns une direction
     */
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

    //Méthode de construction d'un croisement
    AjoutCroisement(position_x, position_y) {
        /// Est ce qu'il y a une place de libre  ? important ca non ? 

        if (this.grille[position_x] === undefined || this.grille[position_x][position_y] === undefined) {
            console.log("Unable to add Croisement, undefined space");
            return false;
        }


        if (this.grille[position_x][position_y] != null) {
            console.log("Unable to add Croisement, space already taken");
            return false;
        }

        let croisement = new Croisement(position_x, position_y);
        this.grille[position_x][position_y] = croisement;
        return true;
    }

    // Affichage rudimentaire sur console servant pour le débugage
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

    // Verifie si la case est vide
    IsNull(x, y) {
        return this.grille[x][y] == null;
    }

    // Verifie que la case existe
    IsDefined(x, y) {
        if (this.grille[x] != undefined) {
            return this.grille[x][y] != undefined;
        }
        return false;
    }





    //Méthode de construction d'une rue
    AjoutRue(position_x, position_y, direction) {
        /// Est ce qu'il y a une place de libre  ? important ca non ? 
        if (this.grille[position_x] === undefined || this.grille[position_x][position_y] === undefined) {
            console.log("Unable to add Rue, undefined");
            return false;
        } // Y'a personne, c'est le VIDE

        if (this.grille[position_x][position_y] != null) {
            console.log("Unable to add Rue, space already taken");
            return false;
        }

        let rue = new Rue(position_x, position_y, direction);
        this.grille[position_x][position_y] = rue;
        return true;
    }

    /// Verification de la validité de la map
    Verification() {
        for (let index_x = 0; index_x < this.size_x; index_x++) {

            for (let index_y = 0; index_y < this.size_y; index_y++) {


                if (!this.IsNull(index_x, index_y) && !this.grille[index_x][index_y].Verification()) {
                    console.log('Verification échoué a : ' + index_x + ' ' + index_y);
                    return false;
                }

            }
        }
        return true;
    }

    /*
    True : Lampadaire existant
    False: Absence de lampadaire
    */
    CheckLampadaire(x, y) {
        return this.grille[x][y].CheckLampadaire();
    }

    /// Renvoie le croisement
    GetCroisement(x, y) {
        return this.grille[x][y];
    }

    /// Méthode de contruction d'un lampadaire sur un croisement
    AjoutLampadaire(x, y, lampadaire) {
        if (this.grille[x] === undefined || this.grille[x][y] === undefined) {
            console.log("Out of index");
            console.log("trying to acces ", x, y);
            console.log("Sorry, will not work");
            return false;
        }    /// Hors de la grille, erreur d'index

        if (this.grille[x][y] == null) {
            console.log("Tentative d'ajout de lampadaire en case null")
            return false;
        }
        if (!this.grille[x][y] instanceof Croisement) {
            console.log("Tentative d'ajout de lampadaire sur autre chose qu'un croisement");
            return false;
        }

        if (this.grille[x][y].CheckLampadaire(lampadaire)) {
            console.log("Tentative d'ajout d'un lampadaire sur une case en contenant déjà")
            return false;
        }

        // Propagation de la lumiere

        let lumiere = lampadaire.CreeLumiere();

        const PropagationLumiere = (starting_x, starting_y, offsets, lumiere) => {
            for (const [offset_x, offset_y] of offsets) {
                let x = parseInt(starting_x) + parseInt(offset_x);
                let y = parseInt(starting_y) + parseInt(offset_y);
                let direction_reference = this.OffsetToDirection(offset_x, offset_y);

                while (this.IsValidPosition(x, y, this) && this.IsNotStreetOrSameDirection(x, y, direction_reference, this)) {

                    this.grille[x][y].AjouterLumiere(lumiere);
                    [x, y] = this.MovePosition(x, y, offset_x, offset_y);
                }
            }
        };

        const offsets = [
            [0, 1], [1, 1], [1, 0], [1, -1],
            [0, -1], [-1, -1], [-1, 0], [-1, 1]
        ];

        this.grille[x][y].AjouterLampadaire(lampadaire);
        this.grille[x][y].AjouterLumiere(lumiere);

        PropagationLumiere(x, y, offsets, lumiere);

    }

    /// verifie que la position est vaide (Prévient OUT OF INDEX)
    IsValidPosition(x, y, map) {
        if (x < 0 || x >= map.size_x) {
            return false;
        }
        if (y < 0 || y >= map.size_y) {
            return false;
        }
        return true;
    }

    /// Determine si la lumère peut se propagé
    IsNotStreetOrSameDirection(x, y, direction_reference, map) {
        let cellule = map.grille[x][y];
        if (cellule instanceof Croisement) {
            return true;
        }
        else if (cellule instanceof Rue) {
            return cellule.direction === direction_reference;
        }
        return false;
    }

    /// Fonction permettant d'effectuer un offset
    MovePosition(x, y, offset_x, offset_y) {
        return [x + offset_x, y + offset_y];
    }

    // Méthode de déstruction d'un lampadaire
    SupprimeLampadaire(x, y, lampadaire) {
        if (this.grille[x] === undefined || this.grille[x][y] === undefined) {
            console.log("Out of index");
            console.log("trying to acces ", x, y);
            console.log("Sorry, will not work");
            return false;
        }    /// Hors de la grille, erreur d'index

        if (this.grille[x][y] == null) {
            console.log("Tentative d'ajout de lampadaire en case null")
            return false;
        }
        if (!this.grille[x][y] instanceof Croisement) {
            console.log("Tentative d'ajout de lampadaire sur autre chose qu'un croisement");
            return false;
        }

        if (!this.grille[x][y].CheckLampadaire(lampadaire)) {
            console.log("Tentative de suppression sur une case ayant")
            return false;
        }

        // Propagation de la lumiere

        let lumiere = lampadaire.CreeLumiere();

        const PropagationLumiere = (starting_x, starting_y, offsets, lumiere) => {
            for (const [offset_x, offset_y] of offsets) {
                let x = parseInt(starting_x) + parseInt(offset_x);
                let y = parseInt(starting_y) + parseInt(offset_y);
                let direction_reference = this.OffsetToDirection(offset_x, offset_y);

                while (this.IsValidPosition(x, y, this) && this.IsNotStreetOrSameDirection(x, y, direction_reference, this)) {

                    this.grille[x][y].SupprimerLumiere(lumiere);
                    [x, y] = this.MovePosition(x, y, offset_x, offset_y);
                }
            }
        };

        const offsets = [
            [0, 1], [1, 1], [1, 0], [1, -1],
            [0, -1], [-1, -1], [-1, 0], [-1, 1]
        ];

        this.grille[x][y].SupprimerLampadaire(lampadaire);
        this.grille[x][y].SupprimerLumiere(lumiere);

        PropagationLumiere(x, y, offsets, lumiere);

    }

    GetNombreLigne() {
        return this.size_y;
    }

    GetNombreColone() {
        return this.size_x;
    }

    SupprimerMap() {
        let nombre_ligne = this.GetNombreLigne();
        let nombre_colone = this.GetNombreColone();

        for (let index_x = 0; index_x < nombre_colone; index_x++) {

            for (let index_y = 0; index_y < nombre_ligne; index_y++) {

                if (this.grille[index_x][index_y] !== null) {
                    this.grille[index_x][index_y].SupprimerMesh();
                }
            }

        }
    }


    LectureMap(raw_data) {
        if (!raw_data || raw_data.trim() === "") {
            console.error("Données brutes non définies ou vides.");
            return; // Sortie de la fonction si les données brutes sont absentes ou vides.
        }


        if (this.grille !== undefined) {
            this.SupprimerMap();
        }

        let nombre_colone;
        let nombre_ligne;

        let data = raw_data.split('\n');
        nombre_colone = parseInt(data[0]);
        nombre_ligne = parseInt(data[1]);

        if (isNaN(nombre_colone) || isNaN(nombre_ligne) || nombre_colone <= 0 || nombre_ligne <= 0) {
            console.error("Dimensions de la grille invalides.");
            return; // Sortie de la fonction si les dimensions de la grille sont invalides.
        }

        this.Initialisaion(nombre_colone + 2, nombre_ligne + 2);

        for (let index_ligne = 2; index_ligne < nombre_ligne + 2; index_ligne++) {
            let ligne = data[index_ligne];

            if (ligne.length !== nombre_colone) {
                console.error("La longueur de la ligne ne correspond pas au nombre de colonnes attendu.");
                continue; // Passer à la prochaine itération si la longueur de la ligne est incorrecte.
            }

            for (let index_colone = 0; index_colone < nombre_colone; index_colone++) {
                let char = ligne[index_colone];

                switch (char) {
                    case " ":
                        continue;
                    case "/":
                        this.AjoutRue(index_colone, index_ligne, Direction.NORD_EST);
                        break;
                    case "\\":
                        this.AjoutRue(index_colone, index_ligne, Direction.SUD_EST);
                        break;
                    case "|":
                        this.AjoutRue(index_colone, index_ligne, Direction.NORD);
                        break;
                    case "-":
                        this.AjoutRue(index_colone, index_ligne, Direction.EST);
                        break;
                    case "#":
                        this.AjoutCroisement(index_colone, index_ligne);
                        break;
                    default:
                        console.error("Caractère non reconnu:", char);
                        break;
                }
            }
        }
    }

    
    SauvegardeSolution(solution) {
        this.solution = solution;
    }
    RemoveSolution() {
        this.solution = null;
    }

    /// Procédure executant une série d'instruction permettant d'afficher la solution a l'écran
    ExecutionSolution() {
        if (this.solution == null) {
            return; // Pas de solution en sauvegard
        }
        console.log("Execution Solution")

        let temporaire = this.solution.split("\n");

        if (temporaire == "s UNSATISFIABLE") {
            /// Aucune solution 
            console.log("Pas de solution");
            return;
        }

        /// Solution a montrer

        let liste = temporaire[1].split(" ").map(Number);
        let indice = 0;

        for (let index_y = 0 ; index_y < this.GetNombreLigne(); index_y++) {
            
            for (let index_x = 0; index_x < this.GetNombreColone(); index_x++) {
            
                if (this.grille[index_x][index_y] instanceof Croisement) {
                    let lampadaire = null;
                    let croisement = this.GetCroisement(index_x, index_y);
                    
                    if (this.CheckLampadaire(index_x, index_y)) {
                        lampadaire = croisement.GetLampadaire();
                    }

                    if (Math.sign(liste[indice]) == 0 && lampadaire != null) {
                        this.SupprimeLampadaire(index_x, index_y, lampadaire);
                    }
                    else if (Math.sign(liste[indice]) == 1 && lampadaire == null) {
                        lampadaire = new Lampadaire(CONSTANTE.Couleurs.BLANC, GetIdNumber());
                                                
                        this.AjoutLampadaire(index_x, index_y, lampadaire);
                    }
                    indice++;
                }

            }

        }




    }




}
var map = null;
function MapInit() {
    map = new Map();
}


export { map, MapInit };



//// Faire une fonction pour lire le format JSON d'envoie 


//// Faire une fonction qui permet de savoir ce qu'il y a a l'emplacement x / y 
/// Réponse possible => croissement, couleur(s), lampadaire
/// rue, couleur
/// vide




