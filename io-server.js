const { Server } = require('socket.io')
const hrtime = process.hrtime.bigint
const diff = (ts1, ts2) => (Number(ts2 - ts1) / 1e6) | 0

const io = new Server()

let pingCount = 0
let pings = []
let pongs = []
let diffs = []
io.on('connection', socket => {
  console.log('a user connected')
  pingCount = 0
  pings = []
  pongs = []
  diffs = []

  socket.on('custom_pong', () => {
    const time = hrtime()
    pongs.push(time)
    diffs.push(diff(pings[pings.length - 1], time))
    pingCount++
    if (pingCount < 1_000) {
      pings.push(hrtime())
      socket.emit('custom_ping')
    } else {
      console.timeEnd('ping-pong')
      socket.disconnect()
      // console.table(pings.map((ms, n) => ({ ping: ms, pong: pongs[n], diff: diffs[n] })))
      const sum = diffs.reduce((acc, n) => acc + n, 0)
      const avg = sum / diffs.length
      console.log(sum, avg)
    }
  })
  console.time('ping-pong')
  pings.push(hrtime())
  socket.emit('custom_ping')
})

io.listen(3000)
