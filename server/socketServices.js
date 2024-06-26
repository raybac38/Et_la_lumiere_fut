/*
    Script Responsable de la gestion de la communication Server / Client via Socket io
    /!\ COTER SERVEUR UNIQUEMENT
*/

/// Chargement de la bibliotech child process


const { exec } = require('child_process');

const fs = require('fs');


var DIMAC = require('./dimacTranslator');
var MAP = require('./map');

var dimac = new DIMAC.Dimac();
var map = new MAP.Map(0, 0);

/**
 * Gère la connexion d'un client socket.
 * @param {Object} socket - Le socket de connexion du client.
 */

function HandleConnexion(socket) {
    let socketId = socket.id;

    console.log("Nouvelle connection : id ", socketId);

    socket.on('request_new_map', (taille_x, taille_y, densite_croisement = 0.2, enable_preverification = false) => {
        console.log("Requette d'une nouvelle carte");

        RunPierroGenerator(taille_x, taille_y, densite_croisement, socketId)
            .then((data) => {
                console.log("Data READED");
                console.log(data);
                socket.emit('map_data', (data));

                Recherche_Solution(data, socket, socketId);




            })
            .catch((error) => {
                console.log("Error");
            })

    });


    socket.on('disconnect', () => {
        console.log("Deconnection : id", socketId);
    });
}


/// Executer le script C permettant la génération d'une carte
function RunPierroGenerator(taille_x, taille_y, densite_croisement, id) {
    let commande = "./Pierrot_generator/terrain_generator " + taille_x + " " + taille_y + " " + densite_croisement;

    return new Promise((resolve, reject) => {
        exec(commande, (error, stdout, stderr) => {
            if (error) {
                console.log('Error : ', error.message);
                reject(error);
                return;
            }
            else if (stderr) {
                console.log('Error : ', stderr);
                reject(new Error(stderr));
                return;
            }
            resolve(stdout);
        });
    });
}
/**
 * Exécute le solveur SAT sur un fichier donné.
 * @param {string} fileName - Le nom du fichier contenant les clauses SAT.
 * @returns {Promise<string>} Une promesse qui résout avec la sortie du solveur SAT.
 */

function RunLimat(fileName) {
    console.log("Interogation du sat solver");
    let commande = "./sat-solver/resol " + fileName;

    return new Promise((resolve, reject) => {
        exec(commande, (error, stdout, stderr) => {
            if (error) {
                console.log('Error : ', error.message);
                exec("./rm " + fileName);
                reject(error);
                return;
            }
            else if (stderr) {
                console.log('Error : ', stderr);
                exec("./rm " + fileName);
                reject(new Error(stderr));
                return;
            }
            resolve(stdout);
        });
    });
};
/**
 * Effectue la recherche d'une solution pour la carte donnée en utilisant le solveur SAT.
 * @param {Object} raw_data - Les données brutes de la carte.
 * @param {Object} socket - Le socket utilisé pour communiquer avec le client.
 * @param {string} id - L'identifiant du client.
 */

function Recherche_Solution(raw_data, socket, id) {
    let filename = "./" + id + ".cnf";
    map.LoadMap(raw_data);
    console.log("Map loaded and creating dimac");
    map.CreateDimac(dimac);
    console.log("Dimac created and outputing")
    dimac.OutputDIMACS(filename);

    setTimeout(() => {
        RunLimat(filename)
        .then((data) => {
            console.log("Data READED");
            console.log(data);
            socket.emit('solve', (data));
        })
        .catch((error) => {
            console.log("Error");
        });
    }, 1000);
    dimac.ClearClause();


    // Exécution de limmat
}




module.exports = { HandleConnexion };