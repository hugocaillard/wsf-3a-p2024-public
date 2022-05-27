import { fetchAPI } from './api'
import { appendMessage } from './dom'

/** @param {MessageEvent} event */
function handleWSMessage(event) {
  const data = JSON.parse(event.data)

  if (data?.type === 'NEW_MESSAGE') {
    appendMessage(data.payload)
  }
}

const ws = new WebSocket('ws://localhost:5000/chat')
ws.onopen = function open() {
  console.log('ws connected')
}
ws.onmessage = handleWSMessage

async function fetchHistory() {
  const messages = await fetchAPI('/chat/history')
  messages.forEach(appendMessage)
}

export function initChat() {
  fetchHistory().then(() => {
    document.querySelector('main')?.classList.add('smooth')
  })

  /** @type {HTMLFormElement | null} */
  const messageForm = document.querySelector('#new-message')

  if (!messageForm) throw new Error('missing form')

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const pseudo = messageForm.pseudo.value
    const body = messageForm.body.value
    if (!pseudo || !body) return
    localStorage.setItem('pseudo', pseudo)

    const newMessage = { pseudo, body }
    ws.send(JSON.stringify(newMessage))
    messageForm.body.value = null
  })
}
