const { WebSocketServer } = require('ws')

const server = new WebSocketServer({
  port: 8080,
  perMessageDeflate: false
})

server.on('connection', (conn, req) => {
  console.log('connected')
  let pingCount = 0

  conn.on('pong', () => {
    pingCount++
    if (pingCount < 100) conn.ping()
    else conn.close()
  })
  conn.ping()
})
