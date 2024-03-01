const { io } = require('socket.io-client')

const SERVER_URL = process.argv[2] || 'localhost'
const socket = io(`ws://${SERVER_URL}:3000`)

socket.on('custom_ping', () => {
  socket.emit('custom_pong')
})
