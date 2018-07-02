# Usage
```
advanced-smoke <url> [<url2> <url3> ...] [options]
```
See command help:
```
advanced-smoke --help
```

# Options
## --status, -s
HTTP status to validate.

default: `200`

## --method, -m
HTTP method used for the request.

default: `GET`

## --headers
Headers to send. Use dot-notation, ex:
```
advanced-smoke https://google.com --headers.MyHeader "Value with spaces"
```

default: `undefined`

## --proxy, -p
Proxy used for the request. Alternatively, you can use the environment variable `ADVANCED_SMOKE_PROXY`.

`HTTP_PROXY`, `HTTPS_PROXY` and `NO_PROXY` will be respected too.

default: `undefined`

## --strictSSL
Whether SSL certificates are required to be valid.

default: `true`

## --timeout, -t
Timeout for the request.

default: `undefined`

## --resolveWithFullResponse, -r
Full request or just head.

default: `true`
