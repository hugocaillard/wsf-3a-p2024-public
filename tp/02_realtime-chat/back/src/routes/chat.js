import { randomUUID } from 'crypto'

/**
 * @typedef {Object} Message
 * @property {string} id - an uuid
 * @property {Date} sentAt - date the mesage was sent
 * @property {string} pseudo - sender pseudo
 * @property {string} body - body of the message
 */

/** @type { Message[] } */
const messages = []

/**
 * @param {string} pseudo
 * @param {string} body
 */
function handleNewMessage(pseudo, body) {
  const message = {
    id: randomUUID(),
    sentAt: new Date(),
    pseudo,
    body,
  }
  messages.push(message)
  return message
}

/**
 * @type { import('fastify').FastifyPluginCallback }
 */
export async function chatRoutes(app) {
  /**
   * @param {{ type: string, payload: object }} data
   */
  function broadcast(data) {
    app.websocketServer.clients.forEach((client) => {
      client.send(JSON.stringify(data))
    })
  }

  app.get('/', { websocket: true }, (connection, req) => {
    connection.socket.on('message', (message) => {
      const data = JSON.parse(message.toString('utf-8'))
      broadcast({
        type: 'NEW_MESSAGE',
        payload: handleNewMessage(data.pseudo, data.body),
      })
    })
  })

  app.get('/history', (request, reply) => {
    reply.send(messages.slice(-30))
  })
}
