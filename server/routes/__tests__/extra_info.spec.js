import { constants as STATUS_CODES } from 'http2'
import { createServer } from '../../index.js'
let server

jest.mock('../../services/s3dataLoader')
jest.mock('../../config')

beforeAll(async () => {
  server = await createServer()
  await server.initialize()
})

afterAll(async () => {
  await server.stop()
})

describe('/Extra info test', () => {
  test('No parameters fails', async () => {
    const options = {
      method: 'GET',
      url: '/extra_info',
      headers: {

      }
    }

    const response = await server.inject(options)
    expect(response.statusCode).toEqual(STATUS_CODES.HTTP_STATUS_NOT_FOUND) // 404
  })

  test('Passing in a valid x and y gets some results', async () => {
    const options = {
      method: 'GET',
      url: '/extra_info/374676.7543833861/164573.87856146507',
      headers: {

      }
    }

    const response = await server.inject(options)
    expect(response.statusCode).toEqual(STATUS_CODES.HTTP_STATUS_OK) // 200
  })
})
