import { S3Client, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { dataConfig } from '../config.js'
import { setCache, getCache } from './serverCache.js'

export const s3DataLoader = async () => {
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
      try {
        if (item.keyname === undefined) {
          throw new Error('An item in the holding comments is missing keyname')
        }
        const itemResponse = await doS3Command(`${dataConfig.holdingCommentsPrefix}/${item.keyname}`)
        const itemcontents = await itemResponse.Body.transformToString()
        const featureData = JSON.parse(itemcontents)
        item.features = featureData
      } catch (err) {
        console.log(err)
      }
    }))
    return jsonData
  }

  const params = { Bucket: dataConfig.awsBucketName, Key: manifestKey }
  const getHeadCommand = new HeadObjectCommand(params)
  const manifestFile = await client.send(getHeadCommand)
  const lastModified = getCache('lastModified')
  if (lastModified === undefined) {
    setCache('lastModified', '')
  }

  if (JSON.stringify(manifestFile.LastModified) === JSON.stringify(lastModified)) {
    if (dataConfig.performanceLogging) {
      console.log('Manifest file has not been modified since the last check.')
    }
    const cachedData = getCache('data')
    return cachedData
  } else {
    console.log('Manifest file has been modified since the last check.')
    const response = await doS3Command(manifestKey)
    const contents = await response.Body.transformToString()
    const data = await loadFeatureData(JSON.parse(contents))
    setCache('lastModified', manifestFile.LastModified)
    setCache('data', data)

    return data
  }
}

export default s3DataLoader
