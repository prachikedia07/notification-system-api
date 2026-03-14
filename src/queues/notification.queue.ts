import {Queue} from "bullmq";
import {redisConnection} from "../db/redis";

export const notificationQueue = new Queue("notification-queue", {
    connection: redisConnection as any
});