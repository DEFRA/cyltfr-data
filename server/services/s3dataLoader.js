const AWS = require('@aws-sdk/client-s3')
const config = require('../config')
const manifestKey = `${config.holdingCommentsPrefix}/${config.manifestFilename}`

async function s3DataLoader () {
  const client = new AWS.S3Client({
    region: config.awsBucketRegion
  })

  const loadFeatureData = async (jsonData) => {
    await Promise.all(jsonData.map(async (item) => {
      const command = new AWS.GetObjectCommand({
        Bucket: config.awsBucketName,
        Key: `${config.holdingCommentsPrefix}/${item.keyname}`
      })
      const response = await client.send(command)
      const itemcontents = await response.Body.transformToString()
      const featureData = JSON.parse(itemcontents)
      item.features = featureData
    }))
    return jsonData
  }

  try {
    const command = new AWS.GetObjectCommand({
      Bucket: config.awsBucketName,
      Key: manifestKey
    })
    const response = await client.send(command)
    const contents = await response.Body.transformToString()
    const jsonData = await loadFeatureData(JSON.parse(contents))

    return jsonData
  } catch (err) {
    console.error(err)
  }
}

module.exports = s3DataLoader
