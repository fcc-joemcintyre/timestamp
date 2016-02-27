/**
 * Copyright (c) Joe McIntyre, 2016
 * license: MIT (https://github.com/fcc-joemcintyre/timestamp/LICENSE.txt)
 */
"use strict";

/**
 * Return homepage with service usage instructions.
 */
function homepage (req, res) {
  let html =
    `<h1>Timestamp Service</h1>
     <p>This service returns a JSON object containing the natural language
     and Unix timestamp form for a passed date. The date can be provided
     as a natural language date (e.g. January 10, 2010) or a Unix timestamp
     (e.g. 1263081600000).<p>
     <p>The API format is</p>
     <pre>  https://timestamp-jm.herukoapp.com/api/date?date='...'</pre>
     <p>where the ... is replaced with the input date or timestamp.</p>
     <p>The result is a JSON message with the format</p>
     <pre>  { "natural":"January 10, 2010", "unix": 1263081600000 }</pre>
     <p>If an invalid input is provided, null will be returned for both
     values.</p>`;
  res.status (200).send (html);
}

/**
 * Return the timestamp object for a request.
 */
function timestamp (req, res) {
  let result = {
    natural: null,
    unix: null
  };
  let inputDate = req.query.date;
  if (inputDate !== undefined) {
    let date = null;
    if (isNaN (parseInt (inputDate))) {
      date = new Date (inputDate);
    } else {
      date = new Date (parseInt (inputDate));
    }
    if (! isNaN (date.getTime ())) {
      let months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
      result.natural = `${months[date.getMonth ()]} ${date.getDate ()}, ${date.getFullYear ()}`;
      result.unix = Date.UTC (date.getFullYear (), date.getMonth (), date.getDate (), 0, 0, 0, 0);
    }
  }
  res.status (200).json (result);
}

exports.homepage = homepage;
exports.timestamp = timestamp;
