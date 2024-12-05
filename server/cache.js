import CatboxMemory from '@hapi/catbox-memory'

export default {
  name: 'server_cache',
  provider: {
    constructor: CatboxMemory.Engine
  }
}
