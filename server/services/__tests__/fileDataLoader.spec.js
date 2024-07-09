const fileDataLoader = require('../fileDataLoader.js')
const DataStore = require('../dataStore.js')

describe('/FileDataLoader test', () => {
  let dataStore

  beforeAll(() => {
    const data = fileDataLoader('./server/services/__tests__/data', 'manifest.json')
    dataStore = new DataStore(data)
  })

  test('loads the manifest file', async () => {
    const matchingData = dataStore.featuresAtPoint(374676.7543833861, 164573.87856146507, true)
    expect(matchingData.length).toBe(4)
    console.log(matchingData)
  })
})
