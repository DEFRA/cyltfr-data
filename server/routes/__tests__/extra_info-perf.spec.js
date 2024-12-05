import { constants as STATUS_CODES } from 'http2'
import createServer from '../../index'
import { value } from '../../config'

jest.mock('../../config', () => ({
  value: {
    env: 'test',
    port: 3000,
    host: '0.0.0.0',
    standAlone: false,
    awsBucketRegion: 'us-west-2',
    awsBucketName: 'my-bucket',
    holdingCommentsPrefix: 'holding-comments',
    manifestFilename: 'manifest.json',
    performanceLogging: false,
    setConfigOptions: jest.fn()
  }
}))

let server

beforeAll(async () => {
  server = await createServer()
  await server.initialize()
  value.setConfigOptions({ performanceLogging: true })
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
