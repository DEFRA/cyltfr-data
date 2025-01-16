import { constants as STATUS_CODES } from 'http2'
import { createServer } from '../../index.js'
import { dataConfig } from '../../config.js'

jest.mock('../../config.js')

let server

beforeAll(async () => {
  dataConfig.setConfigOptions({ performanceLogging: true })
  server = await createServer()
  await server.initialize()
})

afterAll(async () => {
  await server.stop()
})

describe('/Extra info test - with performance logging', () => {
  test('Parameter works', async () => {
    const options = {
      method: 'GET',
      url: '/extra_info/1/1'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toEqual(STATUS_CODES.HTTP_STATUS_OK) // 200
  })
})
