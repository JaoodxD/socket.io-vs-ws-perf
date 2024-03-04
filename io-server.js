const { Server } = require('socket.io')

const io = new Server()

io.on('connection', socket => {
  console.log('a user connected')
  let pingCount = 0

  socket.on('custom_pong', () => {
    pingCount++
    if (pingCount < 100) socket.emit('custom_ping')
    else socket.disconnect()
  })
  socket.emit('custom_ping')
})

io.listen(3000)
