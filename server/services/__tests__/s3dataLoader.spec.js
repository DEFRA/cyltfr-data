const s3dataLoader = require('../s3dataLoader')
const extraInfoService = require('../extraInfoService')

describe('/S3DataLoader test', () => {
  test('loads the manifest file', async () => {
    const data = await s3dataLoader()
    const matchingData = extraInfoService.featuresAtPoint(data, 374676.7543833861, 164573.87856146507, true)
    expect(matchingData.length).toBe(4)
  })
})
