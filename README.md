# Nexus Backend

> A distributed, event-driven backend designed for scalability, real-time communication, and resilient microservices architecture.

---

## Overview

The Nexus backend powers a new kind of social platform focused on:

- Interest-based communities (universes)
- Collaborative projects
- Real-time interactions

It is built as a **scalable microservices system**, capable of handling **high concurrency**, **real-time events**, and **distributed data flows**.

---

## Core Challenge

### Orchestrating **real-time communication** in a **distributed system**

The backend had to handle:

- Real-time chat across users
- Cross-service event propagation
- Data consistency between multiple microservices
- Horizontal scalability

---

### The Problem

In a microservices architecture:

- Services are **isolated** → communication becomes complex  
- Real-time features don’t scale easily across instances  
- Direct coupling creates **tight dependencies**  
- State synchronization becomes **fragile**

---

### The Solution

A combination of:

- **Event-driven architecture** (NATS)
- **WebSocket layer** (Socket.IO)
- **In-memory coordination & caching** (Redis)
- **Flexible persistence** (MongoDB)

Key principles:

- Services communicate via **events, not direct calls**
- Real-time layer is **decoupled from business logic**
- Redis acts as:
  - Pub/Sub relay
  - Cache layer
  - Socket scaling adapter
- Each service owns its **data and domain logic**

---

## Architecture

### Event-Driven Communication (NATS)

- All services communicate asynchronously via **NATS**
- Enables:
  - Loose coupling
  - High scalability
  - Fault tolerance

---

### Real-Time Layer

- Powered by **Socket.IO**
- Handles:
  - Chat messages
  - Live updates
  - Notifications

- Uses **Redis adapter** for:
  - Horizontal scaling
  - Multi-instance synchronization

---

## Tech Stack

### Core

- **NestJS** → Scalable backend framework
- **Node.js** → Runtime environment

---

### Communication

- **NATS**
  - Event-driven messaging between microservices
  - High-performance and lightweight

---

### Real-Time

- **Socket.IO**
  - Bi-directional communication
  - Real-time messaging system

---

### Caching & Coordination

- **Redis**
  - Pub/Sub system
  - Distributed cache
  - Socket scaling adapter

---

### Database

- **MongoDB**
  - Flexible schema design
  - Ideal for evolving domain models

---

## Data Flow Strategy

```text
Client (Mobile/Web)
        │
        ▼
   API Gateway
        │
        ▼
 Microservices Layer
        │
        ▼
   NATS (Event Bus)
        │
        ▼
Other Services React to Events

+ Real-time channel:
Client ⇄ Socket.IO ⇄ Redis ⇄ Services
