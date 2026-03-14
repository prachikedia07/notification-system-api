import Fastify from "fastify";
import dotenv from "dotenv";
import { connectDB } from "./db/connect";
import { notificationRoutes } from "./routes/notification.routes";
import "./workers/notification.worker";
import { register } from "./metrics/metrics";

dotenv.config();

const app = Fastify();
app.get("/metrics", async (req, reply) => {
  reply.header("Content-Type", register.contentType);
  return register.metrics();
});

app.register(notificationRoutes);

const start = async () => {
  try {
    await connectDB();

    await app.listen({ port: 3000 });

    console.log("Server running on port 3000");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();