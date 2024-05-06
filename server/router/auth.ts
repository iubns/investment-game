import Joi from "joi"
import { FastifyInstance, FastifyPluginOptions } from "fastify"
import JoiCheck from "../util/joi"
import { userDatabase } from "../model/dataSource"
import JWT from "jsonwebtoken"
import dotenv from "dotenv"
import { User } from "../entity/user"

dotenv.config()

export default async function AuthRouter(
  server: FastifyInstance,
  option: FastifyPluginOptions
) {
  const JWT_Key = process.env.JWT_PRIVATE_KEY || ""

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
      const newUserPlain = JSON.parse(JSON.stringify(newUser))
      const jwtToken = JWT.sign(newUserPlain, JWT_Key)
      reply.send(jwtToken)
      return
    }
    const foundUserPlain = JSON.parse(JSON.stringify(foundUser))
    const jwtToken = JWT.sign(foundUserPlain, JWT_Key)
    reply.send({ jwtToken })
    return option
  })

  server.get("/check-token", async (request, reply) => {
    const { value } = JoiCheck(request.query, {
      jwtToken: Joi.string().required(),
    })
    const { jwtToken } = value

    try {
      const user = JWT.verify(jwtToken, JWT_Key) as User
      const foundUser = await userDatabase.findOne({ where: { id: user.id } })
      if (!foundUser) {
        reply.send({ result: false })
        return
      }
      reply.send({ result: true })
    } catch {
      reply.send({ result: false })
    }
  })
}
