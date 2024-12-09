import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { value as dataConfig } from '../config.js'

const s3DataLoader = async () => {
  const manifestKey = `${dataConfig.holdingCommentsPrefix}/${dataConfig.manifestFilename}`
  const client = new S3Client({
    region: dataConfig.awsBucketRegion
  })

  const doS3Command = async (key) => {
    const command = new GetObjectCommand({
      Bucket: dataConfig.awsBucketName,
      Key: key
    })
    return client.send(command)
  }

  const loadFeatureData = async (jsonData) => {
    await Promise.all(jsonData.map(async (item) => {
      const itemResponse = await doS3Command(`${dataConfig.holdingCommentsPrefix}/${item.keyname}`)
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

export default s3DataLoader
