const joi = require('joi')

// Define config schema
const schema = joi.object().keys({
  env: joi.string().valid('dev', 'test', 'prod-green', 'prod-blue'),
  host: joi.string().hostname().required(),
  port: joi.number().integer().required(),
  awsBucketRegion: joi.string().required(),
  awsBucketName: joi.string().required(),
  holdingCommentsPrefix: joi.string().default('holding-comments'),
  manifestFilename: joi.string().default('manifest.json')
})

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  host: process.env.HOST,
  awsBucketRegion: process.env.AWS_BUCKET_REGION,
  awsBucketName: process.env.AWS_BUCKET_NAME,
  holdingCommentsPrefix: process.env.HOLDING_COMMENTS_PREFIX,
  manifestFilename: process.env.MANIFEST_FILENAME
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

// Use the joi validated value
const value = result.value

// Add some helper props
value.isDev = value.env === 'dev'
value.isTest = value.env === 'test'
value.isProd = value.env.startsWith('prod-')

console.log('Server config', value)

module.exports = value
