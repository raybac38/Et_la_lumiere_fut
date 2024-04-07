import * as THREE from '/three.js';


export class Croisement {
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


    CreationMesh()
    {

    }

}