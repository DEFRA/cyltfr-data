import joi from 'joi'
import { featuresAtPoint, formatExtraInfo } from '../services/extraInfoService.js'

export default {
  method: 'GET',
  path: '/extra_info/{x}/{y}',
  options: {
    description: 'Get the extra info associated with a point',
    handler: async (request, _h) => {
      const params = request.params

      const data = await request.server.methods.getExtraInfoData()
      const items = featuresAtPoint(data, params.x, params.y, true)
      const result = formatExtraInfo(items)
      return result
    },
    validate: {
      params: joi.object().keys({
        x: joi.number().required(),
        y: joi.number().required()
      }).required()
    }
  }
}
