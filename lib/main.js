/**
 * Copyright (c) Joe McIntyre, 2016
 * license: MIT (https://github.com/fcc-joemcintyre/timestamp/LICENSE.txt)
 */
"use strict";
const processCommand = require ("./cmd").processCommand;
const server = require ("./server");

if (require.main === module) {
  main ();
}

/**
 * Process command line, and start server.
 */
function main () {
  const command = processCommand (process.argv.slice (2));
  if (command.exit) {
    process.exit (command.code);
  }

  // use environment provided port if specified, otherwise provided port
  let port = process.env.PORT || command.port;
  server.start (port);
}
