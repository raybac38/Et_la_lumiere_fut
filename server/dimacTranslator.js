/*

Traducteur en fichier de format DIMAC, Le coeur de la logique ! 

*/
const fs = require('fs');

class Dimac {

    constructor() {

        this.tableau_correspondance = []

        this.nb_litteraux = 0;
        this.clauses = [];
        this.nb_clause = 0;
    }

    AjouterLitteral(valeur)
    {
        if(Math.abs(valeur) > this.nb_litteraux)
        {
            this.nb_litteraux = Math.abs(valeur);
        }

        if(!this.tableau_correspondance.includes(Math.abs(valeur)))
        {
            this.tableau_correspondance.push(Math.abs(valeur));
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
        this.tableau_correspondance = [];
    }

    ConvertToDIMACS(data) {
        let dimacs = '';
    
        for (let clause of this.clauses) {
            let clauseString = '';
            for (let literal of clause) {
                clauseString += ((this.tableau_correspondance.indexOf(Math.abs(literal)) + 1 ) * Math.sign(literal)) + ' ';
            }
            dimacs += clauseString + '0\n';
        }
    
        return dimacs;
    }
    

    OutputDIMACS(fileName) {

        console.log(this.tableau_correspondance);

        console.log("Debut Output DIMACS");
        console.log(this.clauses);
        let dataString = this.ConvertToDIMACS(this.clauses);

        console.log(dataString);
        dataString = "p cnf " + this.nb_litteraux + " " + this.nb_clause + "\n" + dataString;

        fs.writeFile(fileName, dataString, (err) => {
            if (err) {
                console.error('Une erreur est survenue lors de l\'écriture du fichier :', err);
                return;
            }
            console.log(`Le fichier ${fileName} a été créé`);
        });
    }

    GetBijectionTable()
    {
        return this.tableau_correspondance;
    }
}




module.exports = { Dimac }