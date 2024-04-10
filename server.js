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


function OpenJSONFile(name) {
    var file;
    fs.readFile(name, 'utf-8', (err, data) => {
        if (err) {
            console.log("Unable to read json file : " + err);
            return false;
        }
        file = JSON.parse(data);

        let taille = file.taille;
        if(taille == undefined)
        {
            console.log("taille is not find");
            return false;
        }
        let size = taille.x;
        
        if(size == undefined)
        {
            console.log("size_x undefined");
            return false;
        }

        size = taille.y;

        if(size == undefined)
        {
            console.log("size_y undefined");
            return false;
        }

        
    })

    
    




}

//OpenJSONFile('./jeu_de_teste/teste_1.json');