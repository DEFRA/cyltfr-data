const joi = require('joi')
const boom = require('@hapi/boom')
const extraInfoService = require('../services/index')

module.exports = {
  method: 'GET',
  path: '/extra_info/{x}/{y}',
  options: {
    description: 'Get the extra info associated with a point',
    handler: async (request, _h) => {
      const params = request.params

      try {
        const dataStore = await request.server.methods.getExtraInfoData()
        const items = dataStore.featuresAtPoint(params.x, params.y, true)
        const result = extraInfoService.formatExtraInfo(items)
        return result
      } catch (err) {
        return boom.badRequest('Could not call service', err)
      }
    },
    validate: {
      params: joi.object().keys({
        x: joi.number().required(),
        y: joi.number().required()
      }).required()
    }
  }
}
