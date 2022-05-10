/**
 * @type { import("fastify").FastifySchema }
 */
export const homeSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
}

/**
 * @type { import("fastify").RouteHandlerMethod }
 */
export function home(req, reply) {
  reply.send('hello')
}
