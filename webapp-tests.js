/* global describe it */
import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { WebApp } from 'meteor/webapp'
import { HTTP } from 'meteor/http'
import { expect } from 'chai'
import bodyParser from 'body-parser'

const createRoute = () => `/${Random.id()}`
const toUrl = route => Meteor.absoluteUrl(route)

const app = WebApp.connectHandlers
const raw = WebApp.rawConnectHandlers

describe('HTTP request methods', function () {
  ['get', 'head', 'post', 'put', 'delete', 'options', 'trace', 'patch'].forEach(method => {
    it(`creates a ${method} route on connectHandlers`, function (done) {
      app.defineMethod(method)
      const route = createRoute()

      app[method](route, function (req, res) {
        res.writeHead(200)
        res.end()
      })

      const url = toUrl(route)
      HTTP.call(method, url, (err, res) => {
        expect(err).to.equal(null)
        expect(res.statusCode).to.equal(200)
        done()
      })
    })
    it('creates a get route on rawConnectHandlers', function (done) {
      raw.defineMethod(method)
      const route = createRoute()

      raw[method](route, function (req, res) {
        res.writeHead(200)
        res.end()
      })

      const url = toUrl(route)
      HTTP.call(method, url, (err, res) => {
        expect(err).to.equal(null)
        expect(res.statusCode).to.equal(200)
        done()
      })
    })
  })
})

describe('json', function () {
  it('creates a json converter on connectHandlers', function (done) {
    app.json(bodyParser)

    const testId = Random.id()
    const route = createRoute()
    const jsonSrc = { testId }

    app.post(route, function (req, res) {
      expect(req.body.testId).to.equal(jsonSrc.testId)
      res.writeHead(200)
      res.end()
    })

    const url = toUrl(route)
    HTTP.post(url, { data: jsonSrc }, (err, res) => {
      expect(err).to.equal(null)
      expect(res.statusCode).to.equal(200)
      done()
    })
  })
  it('creates a json converter on rawConnectHandlers', function (done) {
    raw.json(bodyParser)

    const testId = Random.id()
    const route = createRoute()
    const jsonSrc = { testId }

    raw.post(route, function (req, res) {
      expect(req.body.testId).to.equal(jsonSrc.testId)
      res.writeHead(200)
      res.end()
    })

    const url = toUrl(route)
    HTTP.post(url, { data: jsonSrc }, (err, res) => {
      expect(err).to.equal(null)
      expect(res.statusCode).to.equal(200)
      done()
    })
  })
})

describe('urlencoded', function () {
  it('creates a content type converter on connectHandlers', function (done) {
    app.urlEncoded(bodyParser)

    const testId = Random.id()
    const route = createRoute()
    const jsonSrc = { testId }

    app.post(route, function (req, res) {
      expect(req.body.testId).to.equal(jsonSrc.testId)
      res.writeHead(200)
      res.end()
    })

    const url = toUrl(route)
    HTTP.post(url, { params: jsonSrc }, (err, res) => {
      expect(err).to.equal(null)
      expect(res.statusCode).to.equal(200)
      done()
    })
  })
  it('creates a content type converter on rawConnectHandlers', function (done) {
    raw.urlEncoded(bodyParser)

    const testId = Random.id()
    const route = createRoute()
    const jsonSrc = { testId }

    raw.post(route, function (req, res) {
      expect(req.body.testId).to.equal(jsonSrc.testId)
      res.writeHead(200)
      res.end()
    })

    const url = toUrl(route)
    HTTP.post(url, { params: jsonSrc }, (err, res) => {
      expect(err).to.equal(null)
      expect(res.statusCode).to.equal(200)
      done()
    })
  })
})
