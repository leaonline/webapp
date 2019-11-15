import { WebApp } from 'meteor/webapp'
import bodyParser from 'body-parser'

const get = (url, handler) => {
  WebApp.connectHandlers.use(url, function (req, res, next) {
    if (req.method.toLowerCase() === 'get') {
      handler.call(this, req, res, next)
    } else {
      next()
    }
  })
}

const post = function (url, handler) {
  WebApp.connectHandlers.use(url, function (req, res, next) {
    if (req.method.toLowerCase() === 'post') {
      if (!req.headers[ 'content-type' ]) {
        // Transforms requests which are POST and aren't "x-www-form-urlencoded" content type
        // and they pass the required information as query strings
        // console.log('Transforming a request to form-urlencoded with the query going to the body.')
        req.headers[ 'content-type' ] = 'application/x-www-form-urlencoded'
        req.body = Object.assign({}, req.body, req.query)
      }
      handler.call(this, req, res, next)
    } else {
      next()
    }
  })
}

const urlEncoded = function ({ extended = false, limit = '100kb' } = {}) {
  WebApp.connectHandlers.use(bodyParser.urlencoded({ extended, limit }))
}

const json = function ({ limit = '100kb' } = {}) {
  WebApp.connectHandlers.use(bodyParser.json({ limit }))
}

WebApp.connectHandlers.get = get
WebApp.connectHandlers.post = post
WebApp.urlEncoded = urlEncoded
WebApp.json = json
