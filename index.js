import Fastify from "fastify";
import { db } from "./db.js";

const fastify = Fastify();

// Declare a route
fastify.get("/", async (request, reply) => {
  try {
    const data = await db.select().from("users").limit(10);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
