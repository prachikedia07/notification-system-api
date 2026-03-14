import { Worker } from "bullmq";
import { redisConnection } from "../db/redis";
import { Notification } from "../models/notification.model";
import { jobsProcessed, jobsFailed , queueSize} from "../metrics/metrics";
import { notificationQueue } from "../queues/notification.queue";

console.log("Notification worker started");

export const NotificationWorker = new Worker(
    "notification-queue",
    async job => {
        // console.log("Attempt:", job.attemptsMade + 1);
      const waiting = await notificationQueue.getWaitingCount();
queueSize.set(waiting);

        const { notificationId } = job.data;
        console.log("Processing notification:", notificationId);

        const notification = await Notification.findById(notificationId);

        if(!notification) {
            throw new Error("Notification not found");
        }

        await new Promise(resolve => setTimeout(resolve, 2000));

        notification.status = "sent";
         await notification.save();
        jobsProcessed.inc();
        // throw new Error("Simulated failure");
       

        console.log("Notification sent:", notificationId);
    },
    {
        connection: redisConnection as any
    }
);

NotificationWorker.on("completed", (job: any) => {
    console.log(`Job ${job.id} completed`);
});

NotificationWorker.on("failed", async (job: any, err: any) => {
  console.error(`Job ${job?.id} failed`, err);

  jobsFailed.inc();

  const notificationId = job.data.notificationId;

  const notification = await Notification.findById(notificationId);

  if (notification) {
    notification.status = "failed";
    await notification.save();
  }
});
