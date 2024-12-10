import joi from 'joi'

// Define config schema
const schema = joi.object().keys({
  env: joi.string().default('dev').valid('dev', 'test', 'prod-green', 'prod-blue'),
  host: joi.string().hostname().default('0.0.0.0'),
  port: joi.number().integer().default(3000), // NOSONAR
  standAlone: joi.boolean().default(false),
  awsBucketRegion: joi.string().required(),
  awsBucketName: joi.string().required(),
  holdingCommentsPrefix: joi.string().default('holding-comments'),
  manifestFilename: joi.string().default('manifest.json'),
  performanceLogging: joi.boolean().default(false)
})

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  host: process.env.HOST,
  standAlone: process.env.STAND_ALONE,
  awsBucketRegion: process.env.AWS_BUCKET_REGION,
  awsBucketName: process.env.AWS_BUCKET_NAME,
  holdingCommentsPrefix: process.env.HOLDING_COMMENTS_PREFIX,
  manifestFilename: process.env.MANIFEST_FILENAME,
  performanceLogging: process.env.PERFORMANCE_LOGGING
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`Config validation error: ${result.error.message}`)
}

const dataConfig = result.value

console.log('dataConfig:', dataConfig)

export { dataConfig }
