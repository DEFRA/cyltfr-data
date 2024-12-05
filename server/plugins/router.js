import extraInfoRoutes from '../routes/extra_info.js'
import healthcheckRoutes from '../routes/healthcheck.js'

const routes = [].concat(extraInfoRoutes, healthcheckRoutes)

export const plugin = {
  name: 'router',
  register: (server, _options) => {
    server.route(routes)
  }
}
