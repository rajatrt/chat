// /**
// Before running:
// > npm install ws
// Then:
// > node server.js
// > open http://localhost:8080 in the browser
// */

// const http = require('http');
const fs = require('fs');
const websocket = require('ws');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

wss = new websocket.Server({ server });

app.get('/', (req,res) => {
  fs.createReadStream('./index.html').pipe(res);
})
app.on('upgrade', wss.handleUpgrade);

wss.on('connection', ws => {
  console.log('web socket connection is alive');
  setInterval(() => {
    let random = (Math.round(Math.random()*1000));
    ws.send(random+' is generated through server...');
  },1000);

});

wss.on('close', ws => console.log("connection closed with this message",ws));


server.listen(8080, () => {
    console.log('server started on PORT 8080');
});