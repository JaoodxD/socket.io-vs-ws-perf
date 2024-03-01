const { WebSocket } = require('ws')

const SERVER_URL = process.argv[2] || 'localhost'

console.time('connect')
const ws = new WebSocket(`ws://${SERVER_URL}:8080`)

ws.on('close', () => console.timeEnd('connect'))
