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

   const PORT = Number(process.env.PORT) || 3000;

await app.listen({ port: PORT, host: "0.0.0.0" });

console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();