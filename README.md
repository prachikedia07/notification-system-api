# Scalable Notification Management System

A backend system demonstrating production-grade backend patterns such as asynchronous job queues, retry mechanisms, rate limiting, and observability.

## Features

- REST API built with Fastify
- MongoDB for persistent storage
- Redis + BullMQ for background job queues
- Worker-based asynchronous notification processing
- Retry mechanism with exponential backoff
- Redis rate limiting to prevent abuse
- Prometheus metrics for observability
- Grafana dashboard for monitoring
- Docker support for infrastructure

## Architecture
```
Client  
↓  
Fastify API  
↓  
Redis Rate Limiter  
↓  
MongoDB (store notifications)  
↓  
Redis Queue (BullMQ)  
↓  
Worker Processing  
↓  
Prometheus Metrics  
↓  
Grafana Dashboard  
```

## Tech Stack

- Node.js
- Fastify
- MongoDB
- Redis
- BullMQ
- Prometheus
- Grafana
- Docker

## System Flow

1. Client sends notification request
2. API validates and stores notification in MongoDB
3. Job is pushed to Redis queue
4. Worker processes notification asynchronously
5. Retry logic handles failures with exponential backoff
6. Metrics exported for Prometheus monitoring

## Running Locally
```
Install dependencies:
  npm install
Start backend:
  npm run dev
Start monitoring stack:
  docker compose up -d
 ``` 
##Endpoints:

- POST /notifications
- GET /notifications
- GET /notifications/:id
- DELETE /notifications/:id

Metrics endpoint:

  /metrics
  Metrics Tracked:
   - notifications_created_total
   - jobs_processed_total
   - jobs_failed_total
   - notification_queue_size
   
##Observability:

Prometheus scrapes the metrics endpoint and Grafana visualizes the system metrics.
