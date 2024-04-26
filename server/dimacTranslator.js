/*

Traducteur en fichier de format DIMAC, Le coeur de la logique ! 

*/
const fs = require('fs');

class Dimac {

    constructor() {
        this.nb_litteraux = 0;
        this.clauses = [];
        this.nb_clause = 0;
    }
    AjouterLitteral(valeur)
    {
        if(valeur > this.nb_litteraux)
        {
            this.nb_litteraux = valeur;
        }
    }

    AjouterClause(clause) {
        this.nb_clause++;
        this.clauses.push(clause);
    }

    ImpressionClause() {
        for (let index = 0; index < this.nb_clause; index++) {
            console.log(this.clauses[index]);
        }
    }

    ClearClause() {
        this.clauses = [];
        this.nb_clause = 0;
        this.nb_litteraux = 0;
    }

    ConvertToDIMACS(data) {
        let dimacs = '';

        for (let i = 0; i < this.nb_clause; i++) {
            console.log(i);
            const clause = this.clauses[i];
            let clauseString = '';
            for (let j = 0; j < clause.length; j++) {
                clauseString += clause[j].toString() + ' ';
            }
            dimacs += clauseString + '0\n';
        }

        return dimacs;
    }

    OutputDIMACS(fileName) {

        console.log("Debut Output DIMACS");
        console.log(this.clauses);
        let dataString = this.ConvertToDIMACS(this.clauses);
        dataString = "p cnf " + this.nb_litteraux + " " + this.nb_clause + "\n" + dataString;

        fs.writeFile(fileName, dataString, (err) => {
            if (err) {
                console.error('Une erreur est survenue lors de l\'écriture du fichier :', err);
                return;
            }
            console.log(`Le fichier ${fileName} a été créé`);
        });
    }
}




module.exports = { Dimac }