import extraInfoRoutes from '../routes/extra_info'
import healthcheckRoutes from '../routes/healthcheck'

const routes = [].concat(extraInfoRoutes, healthcheckRoutes)

export const plugin = {
  name: 'router',
  register: (server, _options) => {
    server.route(routes)
  }
}
