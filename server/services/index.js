const s3DataLoader = require('./s3dataLoader')
const DataStore = require('./dataStore.js')
const CACHE_EXPIRY = 5 * 60 * 1000 // 5 minutes
const CACHE_GENERATE_TIMEOUT = 20 * 1000 // 20 seconds

const getExtraInfoData = async function () {
  const data = await s3DataLoader()
  const dataStore = new DataStore(data)

  return dataStore
}

const formatExtraInfo = function (extraInfoData) {
  const retVal = []

  console.log(extraInfoData)
  extraInfoData.forEach((item) => {
    retVal.push({
      info: item[0].properties.info,
      apply: item[0].properties.apply,
      riskoverride: item[0].properties.riskOverride,
      risktype: item[0].properties.riskType
    })
  })
  return retVal
}

const extraInfoService = {

  getExtraInfoData,

  formatExtraInfo,

  getServerMethod: function () {
    return {
      name: 'getExtraInfoData',
      method: getExtraInfoData,
      options: {
        cache: {
          cache: 'server_cache',
          expiresIn: CACHE_EXPIRY,
          generateTimeout: CACHE_GENERATE_TIMEOUT
        }
      }
    }
  }
}

module.exports = extraInfoService
