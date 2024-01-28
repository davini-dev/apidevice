// index.js
const express = require('express');
const {exec} = require("node:child_process");

const app = express();
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
})

app.get('/', (req, res) => {

  res.send('Hey this is my API running 🥳'+req.query.id);

  res.send('Hey this is my API running Gay 🥳'+req.query.id)

})

app.get('/start', (req, res) => {
  if (req.query.tiktokusername != 'undefined') {
      exec('docker run --name '+req.query.tiktokusername+' -e TIKTOKUSERNAME='+req.query.tiktokusername+' iotbrlabs/curtiktop:latest',(error, stdout) => {
        if (error) {
          return;
        }
        console.log('start ok');
      });
  } else {
    res.send('Necessário especificar tiktokusername no link');
  }
  res.send('start ok');
})


app.get('/stop', (req, res) => {
  if (req.query.tiktokusername) {
    exec('docker stop '+req.query.tiktokusername, (error, stdout) => {
      if (error) {
        console.error('stop exec error: '+error);
        return;
      }
      console.log('stop stdout: '+stdout);
      exec('docker rm '+req.query.tiktokusername, (error, stdout) => {
        if (error) {
          console.error('remove error: '+error);
          return;
        }
        console.log('remove: '+stdout);
      });
    });
  }
  else {
    res.send('Necessário especificar tiktokusername no link');
  }
  res.send('stop ok');
})

// Export the Express API
module.exports = app