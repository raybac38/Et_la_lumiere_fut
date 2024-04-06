/*

    Fichier Javascript cerveau logique du jeu

*/

const Direction = {
    NORD: 'nord',
    NORD_EST: 'nord-est',
    EST: 'est',
    SUD_EST: 'sud-est'
}

const Couleurs = {
    BLEU: 'bleu',
    ROUGE: 'rouge',
    VERT: 'vert',
    JAUNE: 'jaune',
    BLANC: 'blanc'
}


class Lampadaire {
    constructor(couleur, id) {
        this.couleur = couleur;
        this.id = id;
    }

    CreeLumiere() {
        let lumiere = new Lumiere(this.couleur, this.id);
        return lumiere;
    }
}


class Lumiere {

    constructor(couleur, id) {
        this.couleur = couleur;
        this.id = id;
    }
}

class Rue {
    constructor(position_x, position_y, direction) {
        this.position_x = position_x;
        this.position_y = position_y;

        this.direction = direction;
        this.lumieres = [];
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

class Croisement {
    constructor(position_x, position_y) {
        this.position_x = position_x;
        this.position_y = position_y;

        this.lumieres = [];
        this.lampadaire = null;
    }


    AjoutLampadaire(lampadaire) {
        if (this.lampadaire == null) {
            this.lampadaire = lampadaire;
            return true;
        }
        else
        {
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

        if(this.lumieres.length == 0)
        {
            return this.lampadaire != null;
        }
        else
        {
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

function OffsetToDirection(offset_x, offset_y) {
    if (offset_x == 0 && (offset_y == 1 || offset_y == -1)) {
        return Direction.NORD;
    }
    if (offset_x == 1 && offset_y == 1 || offset_x == -1 && offset_y == -1) {
        return Direction.SUD_EST;
    }
    if (offset_x == 1 || offset_x == -1 && offset_y == 0) {
        return Direction.EST;
    }
    if (offset_x == -1 && offset_y == 1 || offset_x == 1 && offset_y == -1) {
        return Direction.NORD_EST;
    }
    throw new console.error('Direction non reconnu');

}


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
            let direction_reference = OffsetToDirection(offset_x, offset_y);


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

    SupprimeLampadaire(lampadaire) {
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
