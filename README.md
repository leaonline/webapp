# Meteor extended Webapp

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
![GitHub file size in bytes](https://img.shields.io/github/size/leaonline/webapp/webapp.js)
![GitHub](https://img.shields.io/github/license/leaonline/webapp)

Extended Meteor webapp for easier creation of routes, a little bit similar to express routes.

## Installation

Add this package as usual:

```bash
$ meteor add leaonline:webapp
```

Optional: If you want to use `body-parser` functionality, you also need to install this npm package:

```bash
$ meteor npm install --save body-parser
```

The `body-parser` package is not coupled as hard dependency to this package, so if you don't install it
it won't be bundled. 

## Usage

This package extends `webapp` so you don't need to import this package directly. Just import `WebApp` and 
define `['get', 'head', 'post', 'put', 'delete', 'options', 'trace', 'patch']` handlers:

```javascript
import { WebApp } from 'meteor/webapp'

const app = WebApp.connectHandlers
app.defineMethod('get') // make app.get available
app.get('/some-data', function(req, res, next) {
  // ...
})
```

You can also use these functions via `WebApp.rawConnectHandlers` if you need to execute them
before any other middleware.

If you need to use `urlEncoded` or `json` via `body-parser` you need to call them **before** defining your routes:

```javascript
import { WebApp } from 'meteor/webapp'
import bodyParser from 'body-parser'

const app = WebApp.connectHandlers
app.urlEncoded(bodyParser, { extended: false, limit: '100kb' })
app.json(bodyParser, { limit: '100kb' })
```
Note, that body parser needs to be injected, because it is not hard-wired to the package.
These functions also work on `WebApp.rawConnectHandlers`

## Using a router

This package did not include router functionality, because there are many routers out there.



## Tests

Run Meteor package tests using `meteortesting:mocha` via

```bash
$ TEST_WATCH=1 TEST_CLIENT=0 meteor test-packages ./ --driver-package meteortesting:mocha
```

## License

MIT, see [LICENSE](./LICENSE)