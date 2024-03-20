const express = require('express')
const path = require('path');
const app = express()
const port = 3000

 


//// Chargement du module THREE.JS
const threeJsPath = path.join(__dirname, './node_modules/three/build/three.module.js');

// Endpoint pour servir le module Three.js
app.get('/three.js', (req, res) => {
    res.sendFile(threeJsPath);
});


/////Chargement du main.html

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'main.html'));
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})