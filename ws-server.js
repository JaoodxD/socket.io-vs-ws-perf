const { WebSocketServer } = require('ws')
const hrtime = process.hrtime.bigint
const diff = (ts1, ts2) => (Number(ts2 - ts1) / 1e3) | 0

const server = new WebSocketServer({
  port: 8080,
  perMessageDeflate: false
})

let pingCount = 0
let pings = []
let pongs = []
let diffs = []

server.on('connection', (conn, req) => {
  console.log('connected')
  pingCount = 0
  let pings = []
  let pongs = []
  let diffs = []

  conn.on('pong', () => {
    const time = hrtime()
    pongs.push(time)
    diffs.push(diff(pings[pings.length - 1], time))
    pingCount++
    if (pingCount < 50_000) {
      conn.ping()
      pings.push(hrtime())
    } else {
      console.timeEnd('ping-pong')
      conn.close()
      // console.table(
      //   pings.map((ms, n) => ({ ping: ms, pong: pongs[n], diff: diffs[n] }))
      // )
      const sum = diffs.reduce((acc, n) => acc + n, 0)
      const avg = sum / diffs.length
      console.log(sum, avg)
    }
  })
  console.time('ping-pong')
  pings.push(hrtime())
  conn.ping()
})
