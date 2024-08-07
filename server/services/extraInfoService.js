const s3DataLoader = require('./s3dataLoader.js')
const { point } = require('@turf/helpers')
const booleanPointInPolygon = require('@turf/boolean-point-in-polygon').default

const getExtraInfoData = async function () {
  const data = await s3DataLoader()

  return data
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

const featuresAtPoint = function (data, x, y, approvedOnly) {
  const pointToCheck = point([x, y])
  const dataToCheck = approvedOnly ? data.filter((item) => { return item.approvedBy ? item : null }) : data
  const dataToReturn = []
  dataToCheck.forEach((item) => {
    item.features.features.forEach((feature) => {
      if (booleanPointInPolygon(pointToCheck, feature)) {
        dataToReturn.push([feature])
      }
    })
  })
  return dataToReturn
}

const extraInfoService = {
  getExtraInfoData,
  featuresAtPoint,
  formatExtraInfo
}

module.exports = extraInfoService
