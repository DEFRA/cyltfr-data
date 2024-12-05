import { mockClient } from 'aws-sdk-client-mock'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { createReadStream } from 'fs'
import path from 'path'
import { sdkStreamMixin } from '@aws-sdk/util-stream-node'
import s3dataLoader from '../../services/s3dataLoader.js'
import { featuresAtPoint } from '../../services/extraInfoService.js'

const TEST_NORTHING = 164573.87856146507
const TEST_EASTING = 374676.7543833861

const s3Mock = mockClient(S3Client)

const resolveStream = function (options) {
  const filename = options.Key.replace('holding-comments/', '')
  const stream = createReadStream(path.join('./server/services/__tests__/data', filename))
  const sdkStream = sdkStreamMixin(stream)
  return { Body: sdkStream }
}

beforeAll(async () => {
  // mock the Amazon stuff
  s3Mock.on(GetObjectCommand).callsFake(resolveStream)
})

afterAll(async () => {
  s3Mock.reset()
})

describe('/S3DataLoader test', () => {
  test('loads the manifest file', async () => {
    const data = await s3dataLoader()
    const matchingData = featuresAtPoint(data, TEST_EASTING, TEST_NORTHING, true)
    expect(matchingData.length).toBe(4)
  })
})
