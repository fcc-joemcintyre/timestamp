/**
 * Copyright (c) Joe McIntyre, 2016
 * license: MIT (https://github.com/fcc-joemcintyre/timestamp/LICENSE.txt)
 */

"use strict";

/**
 * Initialize routes.
 */
function init (app, listener) {
  app.get ("/", listener.homepage);
  app.get ("/api/date", listener.timestamp);
  app.use (listener.homepage);
}

exports.init = init;
