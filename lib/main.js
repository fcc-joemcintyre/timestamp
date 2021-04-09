import { processCommand } from './cmd.js';
import { start } from './server.js';

/**
 * Process command line, and start server.
 * @returns {void}
 */
function main () {
  const command = processCommand (process.argv.slice (2));
  if (command.exit) {
    process.exit (command.code);
  }

  // use environment provided port if specified, otherwise provided port
  const port = Number (process.env.PORT) || command.port;
  start (port);
}

main ();
