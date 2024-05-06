import fastify from "fastify"
import cors from "@fastify/cors"

import AuthRouter from "./router/auth"
import dataSource from "./model/dataSource"

const server = fastify()
server.register(cors, {
  // put your options here
  origin: "*",
})

server.get("/ping", async (request, reply) => {
  return "pong\n"
})

server.register(AuthRouter, { prefix: "/auth" })

server.listen({ port: 8000 }, async (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  await Promise.all([dataSource.initialize()])
  console.log(`Server listening at ${address}`)
})
