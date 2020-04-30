import { WebApp } from 'meteor/webapp'

const methodHandler = (method, target) => (url, handler) => {
  target.use(url, function (req, res, next) {
    if (req.method.toLowerCase() === method) {
      handler.call(this, req, res, next)
    } else {
      next()
    }
  })
}

const defineMethod = (method, target) => {
  Object.defineProperty(target, method, {
    value: methodHandler(method, target),
    writable: false
  })
}

const urlEncoded = target => (bodyParser, { extended = false, limit = '100kb' } = {}) => {
  target.use(bodyParser.urlencoded({ extended, limit }))
}

const json = target => (bodyParser, { limit = '100kb' } = {}) => {
  target.use(bodyParser.json({ limit }))
}

WebApp.connectHandlers.defineMethod = (method) => defineMethod(method, WebApp.connectHandlers)
WebApp.rawConnectHandlers.defineMethod = (method) => defineMethod(method, WebApp.rawConnectHandlers)

WebApp.connectHandlers.urlEncoded = urlEncoded(WebApp.connectHandlers)
WebApp.rawConnectHandlers.urlEncoded = urlEncoded(WebApp.rawConnectHandlers)

WebApp.connectHandlers.json = json(WebApp.connectHandlers)
WebApp.rawConnectHandlers.json = json(WebApp.rawConnectHandlers)
