const s3DataLoader = require('./s3dataLoader')
const DataStore = require('./dataStore.js')

const getExtraInfoData = async function () {
  const data = await s3DataLoader()
  const dataStore = new DataStore(data)

  return dataStore
}

const formatExtraInfo = function (extraInfoData) {
  const retVal = []

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

  formatExtraInfo
}

module.exports = extraInfoService
