import config from '../config.js'
import hapiPino from 'hapi-pino'

export default {
  plugin: hapiPino,
  options: {
    logPayload: true,
    level: config.isDev ? 'debug' : 'warn'
  }
}
