import { constants as STATUS_CODES } from 'http2'
import createServer from '../../index'
import config from '../../config'

let server

beforeAll(async () => {
  server = await createServer()
  await server.initialize()
})

afterAll(async () => {
  await server.stop()
})

describe('/Extra info test - with performance logging', () => {
  config.setConfigOptions({ performanceLogging: true })
  
  test('No parameters fails', async () => {
    const options = {
      method: 'GET',
      url: '/extra_info',
      headers: {}
    }

    const response = await server.inject(options)
    expect(response.statusCode).toEqual(STATUS_CODES.HTTP_STATUS_NOT_FOUND) // 404
  })
})
