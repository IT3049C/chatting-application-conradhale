const API_SERVER = 'https://it3049c-chat.fly.dev'
const REFRESH_INTERVAL = 10000

const nameInput = document.getElementById('my-name-input')
const messageInput = document.getElementById('my-message-input')
const sendButton = document.getElementById('send-button')
const chatBox = document.getElementById('chat')

/**
 * @returns {Promise<Message[]>}
 */
async function fetchMessages() {
  try {
    const res = await fetch(`${API_SERVER}/messages`)
    return res.json()
  } catch {
    return []
  }
}

/**
 * @param {Message} msg
 * @returns {HTMLDivElement}
 */
function displayMessage(msg) {
  const wrapper = document.createElement('div')
  const sender = msg.sender
  wrapper.classList.add('messages', sender === nameInput.value ? 'mine' : 'yours')

  const messageText = document.createElement('div')
  messageText.classList.add('message')
  messageText.innerText = msg.text ?? ''
  wrapper.appendChild(messageText)

  const senderInfo = document.createElement('div')
  senderInfo.classList.add('sender-info')
  const time = new Date(msg.timestamp)
  senderInfo.innerText = `${sender} ${time}`
  wrapper.replaceChildren(messageText, senderInfo)

  return wrapper
}

async function updateMessages() {
  const msgs = await fetchMessages()
  const elements = msgs.map(displayMessage)
  chatBox.replaceChildren(...elements)
}

/**
 * @param {string} sender
 * @param {string} message
 */
async function sendMessage(sender, message) {
  /**
   * @type {Message}
   */
  const msg = {
    sender: sender,
    text: message,
    timestamp: Date.now().toString()
  }

  await fetch(`${API_SERVER}/messages`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(msg)
  })
}

sendButton.addEventListener('click', async (ev) => {
  ev.preventDefault()
  const sender = nameInput.value
  const message = messageInput.value
  await sendMessage(sender, message)
  await updateMessages()
  messageInput.value = ''
})

updateMessages()

setInterval(updateMessages, REFRESH_INTERVAL);
