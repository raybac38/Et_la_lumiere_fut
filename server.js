// Import des modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Initialisation de Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);


const fs = require('fs');
const { log } = require('console');
const { escape } = require('querystring');

// Définition du répertoire des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Définition de la route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/three.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'node_modules/three/build', 'three.module.js'));
});

// Gestion de la connexion d'un client via Socket.IO
io.on('connection', (socket) => {
    console.log('Un client s\'est connecté');

    // Envoi d'un message à tous les clients lorsqu'un nouveau client se connecte
    io.emit('message', 'Un nouveau client s\'est connecté');


    //// Communication Server / Client ^^ Ma fois, la joute verbale sera forte intéréssante

    socket.on('request_prefab_map', (numero) => {

        console.log(numero);
        if(0 < numero && numero < 6)
        {
            // Numero correct
            let name = './jeu_de_teste/teste_' + numero + '.txt';

            let data = OpenMapDataFile(name);


            if(data === false) console.log("Unable to open file");
            else
            {
                socket.emit('map_data', (data));
            }
        }
        else
        {
            console.log("Unable to find prefab map");
        }
        
    });






    // Déconnexion d'un client
    socket.on('disconnect', () => {
        console.log('Un client s\'est déconnecté');
    });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});


//// Fonction 




function OpenMapDataFile(name)
{
    fs.readFile(name, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return false;
        }

        console.log(data);
        return data;
      });
}