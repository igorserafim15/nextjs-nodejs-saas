import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function createAccount(app: FastifyInstance) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/users', { schema: { body: bodySchema } }, () => {
      return 'User created'
    })
}
