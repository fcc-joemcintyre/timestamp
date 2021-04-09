import express from 'express';
import * as http from 'http';
import { homepage } from './homepage.js';
import * as routes from './routes.js';

let server;

/**
 * Start the Timestamp server.
 * @param {number} port HTTP port to listen to
 * @returns {void}
 */
export function start (port) {
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
 * @returns {Promise<void>}
 */
export async function stop () {
  if (server) {
    await server.close ();
  }
}
