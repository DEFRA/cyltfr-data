import { mockClient } from 'aws-sdk-client-mock'
import { S3Client, HeadObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { s3DataLoader } from '../s3dataLoader.js'
import { getCache } from '../serverCache.js'

jest.mock('../../config.js')
jest.mock('../serverCache.js')
jest.mock('../s3dataLoader.js', () => ({
  ...jest.requireActual('../s3dataLoader.js'),
  transformToString: jest.fn()
}))
const s3Mock = mockClient(S3Client)

describe('s3dataLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return cached data if manifest file has not been modified', async () => {
    const mockLastModified = '2023-10-01T00:00:00.000Z'
    const mockCachedData = { key: 'value' }
    s3Mock.on(HeadObjectCommand).resolves({ LastModified: new Date(mockLastModified) })

    s3Mock.on(GetObjectCommand).resolves({ Body: mockCachedData })

    getCache.mockImplementation((key) => {
      if (key === 'lastModified') return mockLastModified
      if (key === 'data') return mockCachedData
    })

    const { transformToString } = require('../s3dataLoader.js')
    transformToString.mockResolvedValue(JSON.stringify(mockCachedData))

    const data = await s3DataLoader()

    expect(data).toEqual(mockCachedData)
  })
})
