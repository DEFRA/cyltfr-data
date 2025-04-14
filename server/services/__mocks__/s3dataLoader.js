import fs from 'fs'
import path from 'path'

function fileLoader (filepath, filename) {
  const data = fs.readFileSync(path.join(filepath, filename))
  const jsonData = JSON.parse(data)
  return loadFeatureData(jsonData, filepath)
}

function loadFeatureData (jsonData, filepath) {
  const errors = []

  jsonData.forEach((item, index) => {
    try {
      if (item.keyname === undefined) {
        throw new Error(`Item at index ${index} is missing keyname`)
      }
      const featureData = loadIndividualFeature(item, filepath)
      item.features = featureData
    } catch (error) {
      errors.push(error.message)
      // Continue processing other items
    }
  })

  // If there were any errors, log them
  if (errors.length > 0) {
    console.error('Errors encountered while processing data:', errors)
  }

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
