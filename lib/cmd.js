/**
 * Valid command options
 *  [-p / --port] port to listen on
 * @param {[String]} args Array of arguments
 * @returns {Object} code:{Integer}, exit:{Boolean}, port:{Integer}
 */
export function processCommand (args) {
  let showHelp = false;
  const errors = [];
  const result = {
    code: 0,
    exit: false,
    port: 0,
  };

  for (const arg of args) {
    // if a settings argument, it will contain an equals sign
    if (arg.indexOf ('=') > -1) {
      // divide argument into left and right sides, and assign
      const elements = arg.split ('=');
      const key = elements[0];
      if (key === '-p' || key === '--port') {
        result.port = Number (elements[1]);
      } else {
        errors.push (`Error: Invalid option (${elements[0]})`);
      }
    } else {
      if (arg === '-h' || arg === '--help') {
        showHelp = true;
      } else {
        errors.push (`Error: Invalid option (${arg})`);
      }
    }
  }

  // validate arguments
  if (showHelp === false) {
    if (Number.isNaN (result.port) || (result.port < 0) ||
      (result.port > 65535) || (Math.floor (result.port) !== result.port)) {
      errors.push ('Invalid port number (must be integer between 0 and 65535)');
    }
    if (errors.length > 0) {
      for (const error of errors) {
        console.log (error);
      }
    }
  }

  if ((showHelp === true) || (errors.length > 0)) {
    console.log (
      `Usage: timestamp [-p=port] [-h]
  -p or --port  Port number to listen on
  -h or --help   This message.`
    );
    result.code = (showHelp) ? 0 : 1;
    result.exit = true;
  }
  return result;
}
