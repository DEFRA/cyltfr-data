var Boom = require('boom')
var Address = require('../models/address')

module.exports = function postcodes (request, reply) {
  var db = request.server.plugins['hapi-mongodb'].db
  var regexp = new RegExp('^' + request.params.partialPostcode.toUpperCase().replace(' ', ''))

  db.collection('address')
    .distinct('POSTCODE', { 'PC_NOSPACE': regexp }, function (err, docs) {
      if (err) {
        request.log('error', err)
        return reply(Boom.badRequest())
      }

      reply(docs.map(function (doc) {
        return new Address(doc)
      }))
    })
}