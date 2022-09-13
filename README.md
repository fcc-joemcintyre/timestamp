# Timestamp Service

This service returns a JSON object containing the natural language
and Unix timestamp form for a passed date. The date can be provided
as a natural language date (e.g. January 10, 2010) or a Unix timestamp
(e.g. 1263081600000).

The API format is

    https://[hostname]/api/date?date=[date]

where [hostname] is the host name of the server hosting the service and
[date] is the input date or Unix timestamp.

An instance of the service is available at https://timestamp-jm.onrender.com

For example, the following URL,

    https://timestamp-jm.onrender.com/api/date?date=1263081600000

will have a result JSON message with the content

    { "natural":"January 10, 2010", "unix": 1263081600000 }

If an invalid input is provided, null will be returned for both values.

## Package Scripts

The following scripts are defined in this package

*Development Build and Run (use in separate terminals)*

```
npm run dev:build
```

```
npm run dev:start
```

*Production Build and Run*

Build

```
npm run build
```

```
npm run start
```

*Other commands*

Run ESLint against lib and test directories

```
npm run lint
```

Typecheck

```
npm run typecheck
```

Run unit and integration tests

```
npm test
```

## License
MIT
