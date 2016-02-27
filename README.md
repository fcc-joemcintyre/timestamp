# Timestamp Service

[![Build Status](https://travis-ci.org/fcc-joemcintyre/timestamp.svg?branch=master)](https://travis-ci.org/fcc-joemcintyre/timestamp)

This service returns a JSON object containing the natural language
and Unix timestamp form for a passed date. The date can be provided
as a natural language date (e.g. January 10, 2010) or a Unix timestamp
(e.g. 1263081600000).

The API format is
```
  https://timestamp-jhm.herukoapp.com/api/date?date='...'
```

where the ... is replaced with the input date or timestamp.

The result is a JSON message with the format
```
  { "natural":"January 10, 2010", "unix": 1263081600000 }
```

If an invalid input is provided, null will be returned for both values.

## License
MIT
