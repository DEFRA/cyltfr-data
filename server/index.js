const hapi = require('@hapi/hapi')
const config = require('./config')
const extraInfoService = require('./services/index')
const cache = require('./cache')

async function createServer () {
  // Create the hapi server
  const server = hapi.server({
    host: config.host,
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
    cache
  })

  // Register the plugins
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/log-errors'))
  await server.register(require('./plugins/logging'))
  await server.register(require('blipp'))

  // Register server methods
  const CACHE_EXPIRY = 300 // 5 minutes
  const CACHE_GENERATE_TIMEOUT = 20 // 20 seconds

  server.method('getExtraInfoData', extraInfoService.getExtraInfoData, {
    cache: {
      cache: 'server_cache',
      expiresIn: CACHE_EXPIRY * 1000,
      generateTimeout: CACHE_GENERATE_TIMEOUT * 1000
    }
  })

  return server
}

module.exports = createServer
