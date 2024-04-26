/*

    Script Responsable de la gestion de la communication Server / Client via Socket io
    /!\ COTER SERVEUR UNIQUEMENT
*/

/// Chargement de la bibliotech child process


const { exec } = require('child_process');

const fs = require('fs').promises;


var DIMAC = require('./dimacTranslator');
var MAP = require('./map');

var dimac = new DIMAC.Dimac();
var map = new MAP.Map(0,0);


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

                Recherche_Solution(data,socket, socketId);




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

//// Teste de map.js


///Execution de LIMMAT
function RunLimat(id) {
    let commande = "./limmat-1.3/limmat ./" + id;

    return new Promise((resolve, reject) => {
        exec(commande, (error, stdout, stderr) => {
            if (error) {
                console.log('Error : ', error.message);
                reject(error);
                return;
            }
            else if (stderr) {
                console.log('Error : ', stderr);
                exec("./rm " + id);
                reject(new Error(stderr));
                return;
            }
            resolve(stdout);
        });
    });
}

function Recherche_Solution(raw_data, socket, id)
{
    map.LoadMap(raw_data);
    map.CreateDimac(dimac);
    dimac.OutputDIMACS(id);
    RunLimat(id)
    .then((data) => {
        console.log("Data READED");
        console.log(data);
        socket.emit('solve', (data));
    })
    .catch((error) => {
        console.log("Error");
    })
}




module.exports = { HandleConnexion };