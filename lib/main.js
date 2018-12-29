const processCommand = require ('./cmd').processCommand;
const server = require ('./server');

if (require.main === module) {
  main ();
}

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
  const port = process.env.PORT || command.port;
  server.start (port);
}
