import { point } from '@turf/helpers'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import config from '../config'
import { performance } from 'node:perf_hooks'

const getExtraInfoDataS3 = async () => {
  let startTime
  if (config.performanceLogging) {
    startTime = performance.now()
  }
  const s3DataLoader = await import('./s3dataLoader.js')
  const data = await s3DataLoader.default()
  if (config.performanceLogging) {
    console.log('Extra info data load time: ', performance.now() - startTime)
  }
  return data
}

const getExtraInfoDataFile = async () => {
  const fileDataLoader = await import('./__mocks__/s3dataLoader.js')
  const data = await fileDataLoader.default()
  return data
}

const getExtraInfoData = config.standAlone ? getExtraInfoDataFile : getExtraInfoDataS3

const formatExtraInfo = (extraInfoData) => {
  const retVal = []
  extraInfoData.forEach((item) => {
    item.forEach((feature) => {
      retVal.push({
        id: feature.id,
        properties: feature.properties
      })
    })
  })
  return retVal
}

const featuresAtPoint = (data, x, y, approvedOnly) => {
  let startTime
  if (config.performanceLogging) {
    startTime = performance.now()
  }
  const pointToCheck = point([x, y])
  const dataToCheck = approvedOnly ? data.filter((item) => item.approvedBy) : data
  const dataToReturn = []
  dataToCheck.forEach((item) => {
    item.features.features.forEach((feature) => {
      if (booleanPointInPolygon(pointToCheck, feature)) {
        dataToReturn.push([feature])
      }
    })
  })
  if (config.performanceLogging) {
    console.log('Extra info featuresAtPoint time: ', performance.now() - startTime)
  }
  return dataToReturn
}

export {
  getExtraInfoData,
  featuresAtPoint,
  formatExtraInfo
}
