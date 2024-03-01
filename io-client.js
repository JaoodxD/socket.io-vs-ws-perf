const { io } = require('socket.io-client')

const SERVER_URL = process.argv[2] || 'localhost'
const concurrency = process.argv[3] || 1

let closed = 0
for (let i = 1; i <= concurrency; i++) {
  console.time('connect ' + i)
  const socket = io(`ws://${SERVER_URL}:3000`, {
    transports: ['websocket'],
    forceNew: true
  })

  socket.on('custom_ping', () => {
    socket.emit('custom_pong')
  })
  socket.io.on('close', () => {
    console.timeEnd('connect ' + i)
    console.log('closed:', ++closed)
  })
  socket.io.on('error', console.error)
}
