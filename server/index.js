const hapi = require('@hapi/hapi')
const config = require('./config')
const extraInfoService = require('./services/extraInfoService')
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

  const CACHE_EXPIRY = 600 // 10 minutes
  const CACHE_STALE = 480 // 8 minutes
  const CACHE_GENERATE_TIMEOUT = 20 // 20 seconds

  // Register the plugins
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/log-errors'))
  await server.register(require('./plugins/logging'))
  await server.register({ plugin: require('./plugins/dataRefresh'), options: { time: CACHE_STALE * 1000 } })
  await server.register(require('blipp'))

  // Register server methods
  server.method('getExtraInfoData', extraInfoService.getExtraInfoData, {
    cache: {
      cache: 'server_cache',
      expiresIn: CACHE_EXPIRY * 1000,
      staleIn: CACHE_STALE * 1000,
      staleTimeout: 50,
      generateTimeout: CACHE_GENERATE_TIMEOUT * 1000
    }
  })

  return server
}

module.exports = createServer
