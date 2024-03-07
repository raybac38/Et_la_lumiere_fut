const express = require('express')
const path = require('path');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'main.html'));
})
app.use(express.static(path.join(__dirname, 'client')));

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})