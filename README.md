# Timestamp Service

[![Build Status](https://travis-ci.org/fcc-joemcintyre/timestamp.svg?branch=master)](https://travis-ci.org/fcc-joemcintyre/timestamp)

This service returns a JSON object containing the natural language
and Unix timestamp form for a passed date. The date can be provided
as a natural language date (e.g. January 10, 2010) or a Unix timestamp
(e.g. 1263081600000).

The API format is

    https://[hostname]/api/date?date=[date]

where [hostname] is the host name of the server hosting the service and
[date] is the input date or Unix timestamp.

An instance of the service is available at https://timestamp-jm.herukoapp.com

The result is a JSON message with the format

    { "natural":"January 10, 2010", "unix": 1263081600000 }

If an invalid input is provided, null will be returned for both values.

## Package Scripts

The following scripts are defined in this package

Run unit tests

```
npm test
```

Start local server instance

```
npm start
```

Run ESLint against lib and test directories

```
npm run lint
```

Check types using Typescript compiler (type checking mode only). Note, this will
use the globally installed Typescript package. If not installed, it can be installed
using: *npm i -g typescript*

```
npm run typecheck
```

## License
MIT
