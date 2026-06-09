# Fraud Detection System

A scalable microservices-based Fraud Detection System built using Node.js and MongoDB. The system analyzes transaction requests, calculates fraud risk scores, detects suspicious activities, and sends notifications for potentially fraudulent transactions.

## Overview

This project simulates a real-world banking and payment fraud detection workflow. Transactions are processed through an API Gateway, analyzed by a Fraud Detection Engine, stored in MongoDB, and notifications are generated for suspicious activities.

## Key Features

- Real-time transaction processing
- Fraud score calculation
- Suspicious transaction detection
- API Gateway architecture
- Microservices-based design
- Notification service integration
- Centralized logging
- MongoDB database integration
- RESTful APIs
- Scalable backend architecture

## Architecture

```
Client
   │
   ▼
API Gateway
   │
   ├── Transaction Service
   │
   ├── Fraud Detection Service
   │
   ├── Notification Service
   │
   └── Logging Service
           │
           ▼
        MongoDB
```

## Fraud Detection Logic

The Fraud Detection Engine evaluates transactions based on predefined rules such as:

- Transaction amount threshold
- High-risk transaction patterns
- Fraud score calculation
- Suspicious transaction flagging

Example:

| Transaction Amount | Fraud Score | Status |
|-------------------|-------------|---------|
| ₹5,000 | 15 | Safe |
| ₹25,000 | 45 | Moderate Risk |
| ₹70,000 | 85 | Fraud Alert |

## Tech Stack

### Backend

- JavaScript (Node.js)
- Express.js

### Database

- MongoDB
- MongoDB Atlas

### Architecture

- Microservices
- REST APIs
- API Gateway Pattern

### Tools

- Git
- GitHub
- Postman

## Services

### API Gateway

Acts as the single entry point for all client requests and routes traffic to appropriate services.

### Transaction Service

Handles transaction creation, validation, and storage.

### Fraud Detection Service

Analyzes transactions and generates fraud scores based on detection rules.

### Notification Service

Sends alerts whenever suspicious transactions are detected.

### Logging Service

Maintains application logs and tracks system activities for monitoring and debugging.

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/Fraud-Detection-System.git
cd Fraud-Detection-System
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### Start Services

```bash
npm start
```

or

```bash
node server.js
```

## API Example

### Create Transaction

```http
POST /api/transactions
```

Request:

```json
{
  "userId": "12345",
  "amount": 70000,
  "type": "transfer"
}
```

Response:

```json
{
  "transactionId": "txn_001",
  "fraudScore": 85,
  "status": "Fraud Alert"
}
```

## Project Structure

```text
Fraud-Detection-System
│
├── api-gateway
├── transaction-service
├── fraud-detection-service
├── notification-service
├── logging-service
├── shared
├── frontend
├── assets
└── README.md
```

## Future Enhancements

- Machine Learning-based fraud prediction
- Real-time dashboard
- Kafka/RabbitMQ integration
- Advanced analytics
- Role-based authentication
- Docker and Kubernetes deployment

## Author

**Harish Gupta**

GitHub: https://github.com/HarishGupta
