import fs from 'fs'
import path from 'path'

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

async function s3DataLoader () {
  const retdata = fileLoader('./server/services/__tests__/data', 'manifest.json')
  return retdata
}

export default s3DataLoader
