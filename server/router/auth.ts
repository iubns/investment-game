import Joi from "joi"
import { FastifyInstance, FastifyPluginOptions } from "fastify"
import JoiCheck from "../util/joi"
import { userDatabase } from "../model/dataSource"

export default async function AuthRouter(
  server: FastifyInstance,
  option: FastifyPluginOptions
) {
  server.post("/login", async (request, reply) => {
    const body = request.body
    const { value } = JoiCheck(body, {
      userName: Joi.string(),
      yearOfBirth: Joi.number(),
    })

    const { userName, yearOfBirth } = value

    const foundUser = await userDatabase.findOne({
      where: { name: userName, yearOfBirth },
    })

    if (!foundUser) {
      const newUser = userDatabase.create()
      newUser.name = userName
      newUser.yearOfBirth = yearOfBirth
      await userDatabase.save(newUser)
      reply.send({ r: "new" })
      return
    }
    reply.send(body)
    return option
  })
}
