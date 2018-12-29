const listener = require ('./listener');

/**
 * Initialize routes.
 * @param {Object} app Express instance
 * @returns {void}
 */
function init (app) {
  app.get ('/api/date', listener.timestamp);
}

exports.init = init;
