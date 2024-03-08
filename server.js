const express = require('express')
const path = require('path');
const app = express()
const port = 3000

const threeDir = path.join(__dirname, 'chemin/vers/vos/fichiers/three');

app.use('/three', express.static(threeDir));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'main.html'));
})
app.use(express.static(path.join(__dirname, 'client')));

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})