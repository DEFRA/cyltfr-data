import Hapi from '@hapi/hapi'
import { dataConfig } from './config.js'
import { getExtraInfoData } from './services/extraInfoService.js'
import cache from './cache.js'
import { plugin as router } from './plugins/router.js'
import logErrors from './plugins/log-errors.js'
import logging from './plugins/logging.js'
import dataRefresh from './plugins/dataRefresh.js'
import blipp from 'blipp'
import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3'

async function createServer () {
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
  const CACHE_STALE = 480 // 8 minutes
  const CACHE_GENERATE_TIMEOUT = 20 // 20 seconds

  await server.register(router)
  await server.register(logErrors)
  await server.register(logging)
  await server.register({ plugin: dataRefresh, options: { time: CACHE_STALE * 1000 } })
  await server.register(blipp)

  const manifestKey = `${dataConfig.holdingCommentsPrefix}/${dataConfig.manifestFilename}`
  const client = new S3Client({ region: dataConfig.awsBucketRegion })
  let lastModified = null

  server.method('getExtraInfoData', async () => {
    const params = { Bucket: dataConfig.awsBucketName, Key: manifestKey }
    const command = new HeadObjectCommand(params)
    const response = await client.send(command)

    if (JSON.stringify(response.LastModified) !== JSON.stringify(lastModified)) {
      lastModified = response.LastModified
      console.log('Manifest file has been modified since the last check.')
      return await getExtraInfoData()
    } else {
      console.log('Manifest file has not been modified since the last check.')
      return null
    }
  }, {
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
