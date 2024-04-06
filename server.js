// Import des modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Initialisation de Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

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
