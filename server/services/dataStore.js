const { point } = require('@turf/helpers')
const booleanPointInPolygon = require('@turf/boolean-point-in-polygon').default

class DataStore {
  // list of all the extra_info data
  constructor (manifestJson) {
    this._originalManifest = manifestJson
  }

  featuresAtPoint (x, y, approvedOnly) {
    const pointToCheck = point([x, y])
    const dataToCheck = approvedOnly ? this._originalManifest.filter((item) => { return item.approvedBy ? item : null }) : this._originalManifest
    const dataToReturn = []
    dataToCheck.forEach((item) => {
      item.features.features.forEach((feature) => {
        if (booleanPointInPolygon(pointToCheck, feature)) {
          dataToReturn.push([item, feature])
        }
      })
    })
    return dataToReturn
  }
}

module.exports = DataStore
