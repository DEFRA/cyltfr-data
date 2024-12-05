import 'dotenv/config'
import createServer from './server'

createServer()
  .then(server => server.start())
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
