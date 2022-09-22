const ws = new WebSocket('ws://localhost:5001')

const username = localStorage.getItem('username') || prompt('what should i call you?') || 'anonymous'
localStorage.setItem('username', username)

ws.addEventListener('open', connectionOpen)
ws.addEventListener('message', handelSocketMessage)

function connectionOpen() {
  console.log('Socket connection established');
}

function appendToChatBox({ sender, message}) {
  const chat = document.getElementById('chat')
  const div = document.createElement('div')
  div.className = 'msg-row'
  const senderDiv = document.createElement('div')
  senderDiv.textContent = sender === username ? "you" : sender
  senderDiv.className = sender === username ? 'sender': "receiver"
  const msgDiv = document.createElement('div')
  msgDiv.textContent = ` : ${message}`
  senderDiv.className = 'msg'
  div.appendChild(senderDiv)
  div.appendChild(msgDiv)
  chat.appendChild(div)
}

function handelSocketMessage(e) {
  try {
    const msg = JSON.parse(e.data)
    appendToChatBox(msg)
  } catch (err) {
    console.err(err);
  }
}

function runHandler(e){
  e.preventDefault()
  if(ws.readyState === WebSocket.OPEN) {
    const input = document.getElementById('message-field')
    const message = input.value
    input.value = ""
    console.log('trying to send :', message);
    ws.send(JSON.stringify({
      sender: username,
      message: message
    }))
  } else {
    console.log('connecting');
  }
}