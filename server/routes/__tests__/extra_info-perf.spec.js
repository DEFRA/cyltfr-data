import { constants as STATUS_CODES } from 'http2'
import { createServer } from '../../index.js'
import { dataConfig } from '../../config.js'

jest.mock('../../config.js')

let server

beforeAll(async () => {
  server = await createServer()
  await server.initialize()
  dataConfig.setConfigOptions({ performanceLogging: true })
})

afterAll(async () => {
  await server.stop()
})

describe('/Extra info test - with performance logging', () => {
  test('No parameters fails', async () => {
    const options = {
      method: 'GET',
      url: '/extra_info'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toEqual(STATUS_CODES.HTTP_STATUS_NOT_FOUND) // 404
  })
})
