const { WebSocketServer } = require('ws')
const hrtime = process.hrtime.bigint
const diff = (ts1, ts2) => (Number(ts2 - ts1) / 1e6) | 0

const server = new WebSocketServer({
  port: 8080,
  perMessageDeflate: false
})

server.on('connection', (conn, req) => {
  console.log('connected')
  let pingCount = 0
  // let pings = []
  // let pongs = []
  // let diffs = []

  conn.on('pong', () => {
    // const time = hrtime()
    // pongs.push(time)
    // diffs.push(diff(pings[pings.length - 1], time))
    pingCount++
    if (pingCount < 1_000) {
      conn.ping()
      // pings.push(hrtime())
    } else {
      conn.close()
      // console.table(
      //   pings.map((ms, n) => ({ ping: ms, pong: pongs[n], diff: diffs[n] }))
      // )
      // const sum = diffs.reduce((acc, n) => acc + n, 0)
      // const avg = sum / diffs.length
      // console.log(sum, avg)
    }
  })
  // pings.push(hrtime())
  conn.ping()
})
