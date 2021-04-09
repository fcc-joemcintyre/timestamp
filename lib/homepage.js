/**
 * Generate home page HTML
 * @returns {string} HTML content
 */
export function homepage () {
  return (
    `<h1>Timestamp Service</h1>
     <p>This service returns a JSON object containing the natural language
     and Unix timestamp form for a passed date. The date can be provided
     as a natural language date (e.g. January 10, 2010) or a Unix timestamp
     (e.g. 1263081600000).<p>
     <p>The API format is</p>
     <pre>  https://[hostname]/api/date?date=[date]</pre>
     <p>where [hostname] is the host name of the server hosting the service and
     [date] is the input date or Unix timestamp.</p>
     <p>The result is a JSON message with the format</p>
     <pre>  { 'natural':'January 10, 2010', 'unix': 1263081600000 }</pre>
     <p>If an invalid input is provided, null will be returned for both
     values.</p>`
  );
}
