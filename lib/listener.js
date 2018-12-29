const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Return the timestamp object for a request.
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 * @returns {void}
 */
function timestamp (req, res) {
  const result = {
    natural: null,
    unix: null,
  };
  const inputDate = req.query.date;
  if (inputDate) {
    let date;
    if (Number.isNaN (Number (inputDate))) {
      date = new Date (inputDate);
    } else {
      date = new Date (Number (inputDate));
    }

    if (! Number.isNaN (date.getTime ())) {
      result.natural = `${months[date.getUTCMonth ()]} ${date.getUTCDate ()}, ${date.getUTCFullYear ()}`;
      result.unix = date.getTime ();
    }
  }
  res.status (200).json (result);
}

exports.timestamp = timestamp;
