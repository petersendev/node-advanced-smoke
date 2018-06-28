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
HTTP status to validate

default: `200`

## --method, -m
HTTP method used for the call

default: `GET`

## --headers
Headers to send. Use dot-notation, ex:
```
advanced-smoke https://google.com --headers.MyHeader "Value with whitespaces"
```

## --timeout, -t
Timeout for the call

## --resolveWithFullResponse, -r
Full request or just head
