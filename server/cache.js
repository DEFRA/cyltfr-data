import CatboxObject from '@hapi/catbox-object'

export default {
  name: 'server_cache',
  provider: {
    constructor: CatboxObject.Engine
  }
}
