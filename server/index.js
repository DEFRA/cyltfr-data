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

  const extraInfoMethod = extraInfoService.getServerMethod()

  server.method(extraInfoMethod.name, extraInfoMethod.method, extraInfoMethod.options)

  return server
}

module.exports = createServer
