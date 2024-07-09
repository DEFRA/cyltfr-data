const fs = require('fs')
const path = require('path')

function fileLoader (filepath, filename) {
  const data = fs.readFileSync(path.join(filepath, filename))
  const jsonData = JSON.parse(data)
  return loadFeatureData(jsonData, filepath)
}

function loadFeatureData (jsonData, filepath) {
  jsonData.forEach((item) => {
    const featureData = loadIndividualFeature(item, filepath)
    item.features = featureData
  })
  return jsonData
}

function loadIndividualFeature (item, filepath) {
  const key = item.keyname
  const data = fs.readFileSync(path.join(filepath, key))
  const jsonData = JSON.parse(data)
  return jsonData
}

module.exports = fileLoader
