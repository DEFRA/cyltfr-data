const CatboxMemory = require('@hapi/catbox-memory')

module.exports = {
  name: 'server_cache',
  provider: {
    constructor: CatboxMemory.Engine
  }
}
