// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from 'meteor/tinytest'

// Import and rename a variable exported by webapp.js.
import { name as packageName } from 'meteor/leaonline:webapp'

// Write your tests here!
// Here is an example.
Tinytest.add('webapp - example', function (test) {
  test.equal(packageName, 'webapp')
})
