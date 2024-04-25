/*

    Script Responsable de la gestion de la communication Server / Client via Socket io
    /!\ COTER SERVEUR UNIQUEMENT
*/

/// Chargement de la bibliotech child process


const { exec } = require('child_process');

const { NeutralToneMapping } = require('three');

const fs = require('fs').promises;


function HandleConnexion(socket) {
    let socketId = socket.id;

    console.log("Nouvelle connection : id ", socketId);


    socket.on('request_new_map', (taille_x, taille_y, densite = 0.2, enable_preverification = false) => {
        console.log("Requette d'une nouvelle carte");

        RunPierroGenerator(taille_x, taille_y, densite, socketId)
            .then((data) => {
                console.log("Data READED");
                console.log(data);
                socket.emit('map_data', (data));
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
function RunPierroGenerator(taille_x, taille_y, densite, id) {
    let commande = "./Pierrot_generator/terrain_generator " + taille_x + " " + taille_y + " " + densite;

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

module.exports = { HandleConnexion };