///

const socketServices = require('./server/socketServices')


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
io.on('connection', socketServices.HandleConnexion);

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