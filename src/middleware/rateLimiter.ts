import { redisConnection } from "../db/redis";
import { FastifyRequest, FastifyReply } from "fastify";

export const rateLimiter = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {

  const body = req.body as any;
  const userId = body?.userId;

  if (!userId) {
    return reply.status(400).send({ error: "userId required" });
  }

  const key = `rate-limit:${userId}`;

  const count = await redisConnection.incr(key);

  if (count === 1) {
    await redisConnection.expire(key, 60);
  }

  console.log("Rate limit count:", count);

  if (count > 5) {
    return reply.status(429).send({
      error: "Too many notifications. Try again later."
    });
  }
};