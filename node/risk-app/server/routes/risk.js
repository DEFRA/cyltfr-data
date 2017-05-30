var Joi = require('joi')
var Boom = require('boom')
var riskService = require('../services/risk')
var addressService = require('../services/address')
var RiskViewModel = require('../models/risk-view')
var errors = require('../models/errors.json')

module.exports = {
  method: 'GET',
  path: '/risk',
  config: {
    description: 'Get risk text page',
    handler: function (request, reply) {
      addressService.findById(request.query.address, function (err, address) {
        if (err) {
          return reply(Boom.badRequest(errors.addressById.message, err))
        }

        var x = address.x
        var y = address.y
        var radius = 20
        riskService.getByCoordinates(x, y, radius, function (err, risk) {
          if (err) {
            return reply(Boom.badRequest(errors.riskProfile.message, err))
          }

          // FLO-1139 If query 1 to 6 errors then throw default error page
          if (risk.inFloodWarningArea === 'Error' ||
          risk.inFloodAlertArea === 'Error' ||
          risk.riverAndSeaRisk === 'Error' ||
          risk.surfaceWaterRisk === 'Error' ||
          risk.reservoirRisk === 'Error') {
            return reply(Boom.badRequest(errors.spatialQuery.message, {
              risk: risk,
              address: address
            }))
          }

          if (!risk.inEngland) {
            reply.redirect('/?err=postcode')
          } else {
            reply.view('risk', new RiskViewModel(risk, address))
          }
        })
      })
    },
    validate: {
      query: {
        address: Joi.number().required()
      }
    }
  }
}