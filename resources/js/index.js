const nameInput = document.getElementById('my-name-input')
const messageInput = document.getElementById('my-message')
const sendButton = document.getElementById('send-button')
const chatBox = document.getElementById('chat')

/**
 * @returns {Message[]}
 */
function fetchMessages() {
  return [
    {
      id: 1,
      text: 'Whats up!',
      sender: 'Conrad Hale',
      timestamp: Date.now()
    },
    {
      id: 2,
      text: 'My man!',
      sender: 'George Washington',
      timestamp: Date.now()
    },
    {
      id: 1,
      text: 'How\'s it going George?',
      sender: 'Conrad Hale',
      timestamp: Date.now()
    },
  ]
}

/**
 * @param {Message} msg
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
  wrapper.appendChild(senderInfo)
  chatBox.appendChild(wrapper)
}

function updateMessages() {
  fetchMessages().forEach(displayMessage)
}

/**
 * @param {string} sender
 * @param {string} message
 */
function sendMessage(sender, message) {
  /**
   * @type {Message}
   */
  const msg = {
    sender: sender,
    text: message,
    timestamp: Date.now()
  }
  displayMessage(msg)
}

sendButton.addEventListener('click', () => {
  const sender = nameInput.value
  const message = messageInput.value
  sendMessage(sender, message)
})

updateMessages()
