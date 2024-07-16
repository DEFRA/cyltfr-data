async function s3DataLoader () {
  const AWS = require('@aws-sdk/client-s3')
  const config = require('../config')
  const manifestKey = `${config.holdingCommentsPrefix}/${config.manifestFilename}`

  const client = new AWS.S3Client({
    region: config.awsBucketRegion
  })

  const doS3Command = async (key) => {
    const command = new AWS.GetObjectCommand({
      Bucket: config.awsBucketName,
      Key: key
    })
    return client.send(command)
  }

  const loadFeatureData = async (jsonData) => {
    await Promise.all(jsonData.map(async (item) => {
      const itemResponse = await doS3Command(`${config.holdingCommentsPrefix}/${item.keyname}`)
      const itemcontents = await itemResponse.Body.transformToString()
      const featureData = JSON.parse(itemcontents)
      item.features = featureData
    }))
    return jsonData
  }

  const response = await doS3Command(manifestKey)
  const contents = await response.Body.transformToString()
  const data = await loadFeatureData(JSON.parse(contents))

  return data
}

module.exports = s3DataLoader
