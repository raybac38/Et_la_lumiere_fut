const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);

const path = require('path');
const port = 3000;

const fs = require('fs');
///////////Classe

class Tuile {
  constructor(id, rues){
    this.id = id;
    this.rues = rues;
  }
}

class Carte {
  constructor(taille, tuiles){
    this.taille = taille;
    this.tuiles = tuiles.map(tuile => new Tuile(tuile.id, tuile.rue));
  }
}


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


///// Communication

function Request_Prefab_Map(map_name) {
  var filename = "./jeu_de_test/teste_";
  switch (map_name) {

    case "Map 1":
      filename += "1";
      break;
    case "Map 2":
      filename += "2";

      break;
    case "Map 3":
      filename += "3";

      break;
    case "Map 4":
      filename += "4";

      break;
    case "Map 5":
      filename += "5";

      break; 
    case "Map 6":
      filename += "6";

      break;
    default:
      console.log("Prefab Inexistant\n");
      return;
      break;
    }
    filename += ".json";

    let data_json =  JSON.parse(fs.readFileSync(filename));
    var carte = new Carte(data_json.taille, data_json.tuiles);
  
  socket.emit('new_map_data', carte);

}


function Request_New_Map() {

}

function Request_Solve() {

}


/////////////
//  Socket IO 



io.on('connection', (socket) => 
{
  console.log('Un client est connecté\n');

  socket.on('request_prefab_map',(map_name) =>
  {
    Request_Prefab_Map(map_name);
  });
})



