const s3dataLoader = require('../s3dataLoader')
const extraInfoService = require('../extraInfoService')
const TEST_EASTING = 374676.7543833861
const TEST_NORTHING = 164573.87856146507

describe('/S3DataLoader test', () => {
  test('loads the manifest file', async () => {
    const data = await s3dataLoader()
    const matchingData = extraInfoService.featuresAtPoint(data, TEST_EASTING, TEST_NORTHING, true)
    expect(matchingData.length).toBe(4)
  })
})
