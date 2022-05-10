import { home, homeSchema } from './home.js'

/**
 * @type { import('fastify').FastifyPluginCallback }
 */
export async function routes(app) {
  app.get('/', { schema: homeSchema }, home)
}
