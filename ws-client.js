const { WebSocket } = require('ws')

console.time('connect')
const ws = new WebSocket('ws://localhost:8080')

ws.on('close', () => console.timeEnd('connect'))
