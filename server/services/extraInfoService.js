const { point } = require('@turf/helpers')
const config = require('../config')
const booleanPointInPolygon = require('@turf/boolean-point-in-polygon').default

const getExtraInfoDataS3 = async function () {
  const s3DataLoader = require('./s3dataLoader.js')
  const data = await s3DataLoader()

  return data
}

const getExtraInfoDataFile = async function () {
  const fileDataLoader = require('./__mocks__/s3dataLoader.js')
  const data = await fileDataLoader()

  return data
}

const getExtraInfoData = config.standAlone ? getExtraInfoDataFile : getExtraInfoDataS3

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
