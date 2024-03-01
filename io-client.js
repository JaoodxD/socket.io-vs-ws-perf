const { io } = require('socket.io-client')
const socket = io('ws://localhost:3000')

socket.on('custom_ping', () => {
  socket.emit('custom_pong')
})
