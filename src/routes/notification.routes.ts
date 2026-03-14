import { FastifyInstance } from "fastify";
import { rateLimiter } from "../middleware/rateLimiter";

import {
    createNotification,
    getNotifications,
    getNotificationById,
    deleteNotification
} from "../controllers/notification.controller";

export async function notificationRoutes(fastify: FastifyInstance) {
 fastify.post("/notifications", {
  preHandler: rateLimiter,
  handler: createNotification,
});

    fastify.get("/notifications", getNotifications);

    fastify.get("/notifications/:id", getNotificationById);

    fastify.delete("/notifications/:id", deleteNotification);   
}