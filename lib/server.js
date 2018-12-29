const express = require ('express');
const http = require ('http');
const { homepage } = require ('./homepage');
const routes = require ('./routes');

let server;

/**
 * Start the Timestamp server.
 * @param {number} port HTTP port to listen to
 * @returns {void}
 */
function start (port) {
  console.log ('Starting Timestamp server');

  // initialize and start server
  const app = express ();
  routes.init (app);

  const html = homepage ();
  app.get ('*', (req, res) => res.status (200).send (html));

  server = http.createServer (app);
  server.listen (port, () => {
    console.log (`Timestamp server listening on port ${port}`);
  });
}

/**
 * Stop the server
 * @returns {void}
 */
async function stop () {
  if (server) {
    await server.close ();
  }
}

exports.start = start;
exports.stop = stop;
