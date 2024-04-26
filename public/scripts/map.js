/*

    Fichier Javascript cerveau logique du jeu

*/
import { camera } from '../client.js';

import { Couleurs, Direction } from './constants.js';

import { Rue } from "./rue.js";

import { Croisement } from "./croisement.js";

import { Lumiere, Lampadaire } from './lumiere.js';


export class Map {

    constructor(size_x = 0, size_y = 0) {
        this.Initialisaion(size_x, size_y);
    }

    IsMapEmpty()
    {
        return this.size_x === 0 && this.size_y === 0;
    }

    Initialisaion(taille_x, taille_y) {
        this.size_x = taille_x;
        this.size_y = taille_y;
        camera.position.set(this.size_x / 2, this.size_x, this.size_y / 2);
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
        if (this.grille[x] != undefined) {
            return this.grille[x][y] != undefined;
        }
        return false;
    }





    //Méthode de construction
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
    CheckLampadaire(x,y)
    {
        return this.grille[x][y].CheckLampadaire();
    }

    /// Renvoie le croisement
    GetCroisement(x, y)
    {
        return this.grille[x][y];
    }


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
        console.log(lumiere);

        console.log("lumiere : ", lumiere);
        
        const PropagationLumiere = (starting_x, starting_y, offsets, lumiere) => {
            for (const [offset_x, offset_y] of offsets) {
                let x = parseInt(starting_x) + parseInt(offset_x);
                let y = parseInt(starting_y) + parseInt(offset_y);
                let direction_reference = this.OffsetToDirection(offset_x, offset_y);
        
                console.log("Avant le tour de boucle");
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

    IsValidPosition(x, y, map) {
        if (x < 0 || x >= map.size_x) {
            return false;
        }
        if (y < 0 || y >= map.size_y) {
            return false;
        }
        return true;
    }

    IsNotStreetOrSameDirection(x, y, direction_reference, map) {
        console.log(map, x, y);
        let cellule = map.grille[x][y];
        if(cellule instanceof Croisement)
        {
            return true;
        }
        else if(cellule instanceof Rue)
        {
            return cellule.direction === direction_reference;
        }
        return false;
    }

    MovePosition(x, y, offset_x, offset_y) {
        return [x + offset_x, y + offset_y];
    }

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
        console.log(lumiere);

        console.log("lumiere : ", lumiere);
        
        const PropagationLumiere = (starting_x, starting_y, offsets, lumiere) => {
            for (const [offset_x, offset_y] of offsets) {
                let x = parseInt(starting_x) + parseInt(offset_x);
                let y = parseInt(starting_y) + parseInt(offset_y);
                let direction_reference = this.OffsetToDirection(offset_x, offset_y);
        
                console.log("Avant le tour de boucle");
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
}
var map = null;
function MapInit()
{
    map = new Map();
}


export { map , MapInit};



//// Faire une fonction pour lire le format JSON d'envoie 


//// Faire une fonction qui permet de savoir ce qu'il y a a l'emplacement x / y 
/// Réponse possible => croissement, couleur(s), lampadaire
/// rue, couleur
/// vide




