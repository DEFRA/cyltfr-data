async function s3DataLoader () {
  const fileDataLoader = require('../fileDataLoader')
  const retdata = fileDataLoader('./server/services/__tests__/data', 'manifest.json')
  return retdata
}

module.exports = s3DataLoader
