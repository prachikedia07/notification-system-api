import { Notification } from '../models/notification.model';
import { FastifyRequest, FastifyReply } from "fastify";
import { notificationQueue } from '../queues/notification.queue';
import { notificationsCreated } from '../metrics/metrics';

export const createNotification = async (
  req: FastifyRequest<{
    Body: {
      userId: string;
      type: string;
      message: string;
      priority?: string;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    const notification = await Notification.create({
      ...req.body,
      status: "pending"
    });

   await notificationQueue.add(
  "send-notification",
  { notificationId: notification._id },
  {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000
    }
  }
);
    
    notificationsCreated.inc();
    return reply.send(notification);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Failed to create notification" });
  }
};

export const getNotifications = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const notifications = await Notification.find();

    reply.send(notifications);
  } catch (error) {
    reply.status(500).send({ error: "Failed to fetch notifications" });
  }

};

export const getNotificationById = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);

    if (!notification) {
      return reply.status(404).send({ error: "Notification not found" });
    }

    reply.send(notification);
  } catch (error) {
    reply.status(500).send({ error: "Failed to fetch notification" });
  }
};

export const deleteNotification = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;

    const deleted = await Notification.findByIdAndDelete(id);

    if (!deleted) {
      return reply.status(404).send({ error: "Notification not found" });
    }

    reply.send({ message: "Notification deleted successfully" });
  } catch (error) {
    reply.status(500).send({ error: "Failed to delete notification" });
  }
};