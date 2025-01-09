import joi from 'joi'
import { featuresAtPoint, formatExtraInfo } from '../services/extraInfoService.js'
import { dataConfig } from '../config.js'
import { performance } from 'node:perf_hooks'

export default {
  method: 'GET',
  path: '/extra_info/{x}/{y}',
  options: {
    description: 'Get the extra info associated with a point',
    handler: async (request, _h) => {
      let startTime
      if (dataConfig.performanceLogging) {
        startTime = performance.now()
      }
      const params = request.params

      const data = await request.server.methods.getExtraInfoData()
      const items = featuresAtPoint(data, params.x, params.y, true)
      const result = formatExtraInfo(items)
      if (dataConfig.performanceLogging) {
        console.log('GET /extra_info/ time: ', performance.now() - startTime)
      }
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
