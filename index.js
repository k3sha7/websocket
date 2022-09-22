const express = require('express')
const { WebSocketServer, WebSocket } = require('ws')
const app = express()

const wss = new WebSocketServer({
  port: 5001,
  clientTracking: true
})

wss.on('connection', function connection(ws){
  ws.on('message', function message(data){
    try {
      const msg = Buffer.from(data).toString()
      for(const client of wss.clients) {
        console.log(client.readyState);
        if(client.readyState === 1){
          client.send(msg)
        }
      }
    } catch(err) {
      console.log(err);
    }
  })

  ws.send(JSON.stringify({
    sender: 'system',
    message: 'connection established'
  }))
})

app.use(express.static('public'))

app.listen(5000, () => {
  console.log('server listening to port 5000')
})