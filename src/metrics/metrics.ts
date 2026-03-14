import client from "prom-client";

export const register = new client.Registry();

client.collectDefaultMetrics({ register });

export const notificationsCreated = new client.Counter({
    name: "notifications_created_total",
    help: "Total number of notifications created"
});

export const jobsProcessed = new client.Counter({
  name: "jobs_processed_total",
  help: "Total number of jobs processed successfully"
});

export const jobsFailed = new client.Counter({
  name: "jobs_failed_total",
  help: "Total number of jobs that failed"
});

export const queueSize = new client.Gauge({
  name: "notification_queue_size",
  help: "Current number of jobs waiting in the queue"
});

register.registerMetric(notificationsCreated);
register.registerMetric(jobsProcessed);
register.registerMetric(jobsFailed);
register.registerMetric(queueSize);