import Hapi from '@hapi/hapi'
import { dataConfig } from './config.js'
import { getExtraInfoData } from './services/extraInfoService.js'
import cache from './cache.js'
import { plugin as router } from './plugins/router.js'
import logErrors from './plugins/log-errors.js'
import logging from './plugins/logging.js'
import dataRefresh from './plugins/dataRefresh.js'
import blipp from 'blipp'

async function createServer () {
  // Create the hapi server
  const server = Hapi.server({
    host: dataConfig.host,
    port: dataConfig.port,
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
  const CACHE_STALE = 30 // 8 minutes
  const CACHE_GENERATE_TIMEOUT = 20 // 20 seconds

  // Register the plugins
  await server.register(router)
  await server.register(logErrors)
  await server.register(logging)
  await server.register({ plugin: dataRefresh, options: { time: CACHE_STALE * 1000 } })
  await server.register(blipp)

  // Register server methods
  server.method('getExtraInfoData', getExtraInfoData, {
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

export { createServer }
