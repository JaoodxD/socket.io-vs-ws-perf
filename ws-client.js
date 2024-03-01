const { WebSocket } = require('ws')

const SERVER_URL = process.argv[2] || 'localhost'
const concurrency = process.argv[3] || 1

for (let i = 1; i <= concurrency; i++) {
  console.time('connect ' + i)
  const ws = new WebSocket(`ws://${SERVER_URL}:8080`)

  ws.on('close', () => console.timeEnd('connect ' + i))
  ws.on('error', console.error)
}
