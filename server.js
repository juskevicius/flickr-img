const dotEnv = require('dotenv');
const websocket = require('ws');
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const helmet = require('helmet');

dotEnv.config();
const app = express();
const server = http.createServer(app);

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 3030);

const dev = app.get('env') !== 'production';

if (!dev) {
  app.use(helmet());
  app.use(morgan('common'));
  app.use(express.static(path.join(__dirname, './frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
  });
}

if (dev) {
  app.use(morgan('dev'));
}

const wss = new websocket.Server({ server });

wss.on('connection', (connection) => {
  let currPage = 1; 

  fetchImages(currPage);
  
  connection.on('message', (msg) => {
    if (currPage <= 50 && msg !== "ping") {
      fetchImages(currPage);
      currPage++;
    }
  });

  function fetchImages(pageToReturn) {
    axios
      .get(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${process.env.APIKEY}&per_page=20&page=${pageToReturn}&format=json&nojsoncallback=1`)
      .then(response => {
        connection.send(JSON.stringify(response.data.photos));
      })
      .catch(error => console.log(error));
  }
});

server.listen(PORT, err => {
  if (err) throw err;
  console.log("Server started!");
});