import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

export async function createAccount(app: FastifyInstance) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  app
    .withTypeProvider<ZodTypeProvider>()
    .post(
      '/users',
      { schema: { body: bodySchema } },
      async (request, response) => {
        const body = request.body

        const userWithSameEmail = await prisma.user.findUnique({
          where: { email: body.email },
        })

        if (userWithSameEmail) {
          return response
            .status(409)
            .send({ message: 'user with same email already exists. ' })
        }

        const passwordHash = await hash(body.password, 6)

        await prisma.user.create({
          data: {
            name: body.name,
            email: body.email,
            passwordHash,
          },
        })

        return response.status(201).send()
      },
    )
}
