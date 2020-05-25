const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Return the timestamp object for a request.
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 * @returns {void}
 */
export function timestamp (req, res) {
  const result = {
    natural: null,
    unix: null,
  };
  const inputDate = req.query.date;
  if (inputDate) {
    if (Number.isNaN (Number (inputDate))) {
      // handle text version of date
      const date = new Date (inputDate);
      if (!Number.isNaN (date.getTime ())) {
        result.natural = `${months[date.getUTCMonth ()]} ${date.getUTCDate ()}, ${date.getUTCFullYear ()}`;
        result.unix = Date.UTC (date.getUTCFullYear (), date.getUTCMonth (), date.getUTCDate (), 0, 0, 0, 0);
      }
    } else {
      // handle unix timestamp version of date
      const date = new Date (Number (inputDate));
      if (!Number.isNaN (date.getTime ())) {
        result.natural = `${months[date.getUTCMonth ()]} ${date.getUTCDate ()}, ${date.getUTCFullYear ()}`;
        result.unix = date.getTime ();
      }
    }
  }
  res.status (200).json (result);
}
