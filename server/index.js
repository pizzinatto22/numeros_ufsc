const servidores = require("./servidores");
const alunos = require("./graduacao");
const pos = require("./pos_graduacao");
const http = require('http');
const moment = require('moment');

let cache = {};
let horaCache = null;

async function requestListener (req, res) {
  const agora = new Date();

  if (!horaCache || (agora.getTime() - horaCache.getTime() >= 1000*60*5)) {
    horaCache = agora;

    try {
      cache.servidores = await servidores();
    } catch(e) {
      cache.servidores = {};
    }

    try {
      cache.graduacao = await alunos();

    } catch (e) {
      cache.graduacao = {}
    }

    try {
      cache.pos = await pos();
    } catch(e) {
      cache.pos = {}
    }

    cache.hora = moment(horaCache).format("DD/MM/YYYY HH:mm:ss")
  }

  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  });

  res.end(JSON.stringify(cache));
}

const server = http.createServer(requestListener);
server.listen(3002);
