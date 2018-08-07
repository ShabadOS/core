import { setupExpress } from './lib/express'
import SessionManager from './lib/SessionManager'
import Socket from './lib/Sockets'
import { searchLines, getBanis } from './lib/db'
import logger from './lib/logger'

/**
 * Async entry point for application.
 */
async function main() {
  logger.info( 'Starting...' )
  // Setup the express server with WebSockets
  const mounts = [
    { prefix: '/', dir: `${__dirname}/frontend/build` },
    { prefix: '/themes', dir: `${__dirname}/frontend/themes` },
  ]
  const server = await setupExpress( mounts )

  // Setup the websocket server
  const socket = new Socket( server )

  // Setup the session manager on top of the Socket instance
  // eslint-disable-next-line
  const sessionManager = new SessionManager( socket )

  // Register searches on the socket instance
  socket.on( 'search', async ( client, search ) => client.sendJSON( 'results', await searchLines( search ) ) )

  // Register Bani list requests on socket connection
  socket.on( 'connection', async client => client.sendJSON( 'banis', await getBanis() ) )

  // Start the server
  const port = process.env.PORT || 8080
  server.listen( port, () => logger.info( `Running express API server on port ${port}` ) )
}


// Handle any errors by crashing
main().catch( error => {
  logger.error( error )
  process.exit( 1 )
} )
