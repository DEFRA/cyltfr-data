const s3dataLoader = require('../s3dataLoader')
const DataStore = require('../dataStore.js')

describe('/FileDataLoader test', () => {
  let dataStore

  beforeAll(async () => {
    const data = await s3dataLoader()
    dataStore = new DataStore(data)
  })

  test('loads the manifest file', async () => {
    const matchingData = dataStore.featuresAtPoint(374676.7543833861, 164573.87856146507, true)
    expect(matchingData.length).toBe(4)
  })
})
