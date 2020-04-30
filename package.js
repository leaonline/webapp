/* eslint-env meteor */
Package.describe({
  name: 'leaonline:webapp',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'Extended Meteor webapp for easier creation of routes',
  // URL to the Git repository containing the source code for this package.
  git: 'git@github.com:leaonline/webapp.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.8.1')
  api.use(['ecmascript', 'webapp'], 'server')
  api.addFiles('webapp.js', 'server')
})

Package.onTest(function (api) {
  Npm.depends({
    chai: '4.2.0',
    'body-parser': '1.19.0'
  })

  api.use('ecmascript')
  api.use('http')
  api.use('random')
  api.use('meteortesting:mocha')
  api.use('leaonline:webapp')
  api.mainModule('webapp-tests.js')
})
