const AWS = require('@aws-sdk/client-s3')
const { mockClient } = require('aws-sdk-client-mock')
const { sdkStreamMixin } = require('@smithy/util-stream')
const { createReadStream } = require('fs')
const path = require('path')
const s3dataLoader = require('../s3dataLoader')
const extraInfoService = require('../extraInfoService')

const s3Mock = mockClient(AWS.S3Client)

const resolveStream = function (options) {
  const filename = options.Key.replace('holding-comments/', '')
  const stream = createReadStream(path.join('./server/services/__tests__/data', filename))
  const sdkStream = sdkStreamMixin(stream)
  return { Body: sdkStream }
}

beforeAll(async () => {
  // mock the Amazon stuff
  s3Mock.on(AWS.GetObjectCommand).callsFake(resolveStream)
})

afterAll(async () => {
})

describe('/S3DataLoader test', () => {
  test('loads the manifest file', async () => {
    const data = await s3dataLoader()
    const matchingData = extraInfoService.featuresAtPoint(data, 374676.7543833861, 164573.87856146507, true)
    expect(matchingData.length).toBe(4)
  })
})
