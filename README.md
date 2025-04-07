# Event Management System API

## Overview

A robust Event Management System backend built with Express.js and TypeScript. This API provides endpoints for user authentication, event management, and ticket handling. The system implements JWT-based authentication with access and refresh tokens for secure user sessions.

## Features

- **Authentication System**

    - JWT-based authentication with access and refresh tokens
    - Role-based access control (User/Admin)
    - Secure password hashing
    - Token refresh mechanism

- **User Management**

    - User registration and login
    - Profile management
    - Role management (Admin can promote users)

- **Event Management**

    - Create, read, update, and delete events
    - Event listing and details
    - Ticket management for events

- **Security**

    - Input validation using express-validator
    - Error handling middleware
    - Secure password storage
    - Token-based authentication

- **Documentation**
    - Swagger/OpenAPI documentation
    - Detailed API endpoints documentation
    - Request/response schemas

## Local Setup

1. **Prerequisites**

    - Node.js (v14 or higher)
    - npm or yarn
    - PostgreSQL database

2. **Installation**

    ```bash
    # Clone the repository
    git clone <repository-url>
    cd ems-backend

    # Install dependencies
    npm install

    # Create .env file
    cp .env.example .env
    ```

3. **Environment Variables**
   Create a `.env` file with the following variables:

    ```
    PORT=3000
    DATABASE_URL=postgresql://user:password@localhost:5432/ems_db
    JWT_SECRET=your_jwt_secret
    ```

4. **Database Setup**

    ```bash
    # Run database migrations
    npx prisma migrate dev
    ```

5. **Start the Server**

    ```bash
    # Development
    npm run dev

    # Production
    npm run build
    npm start
    ```

## APIs

| Category              | Endpoint                | Method | Description                       | Authentication Required |
| --------------------- | ----------------------- | ------ | --------------------------------- | ----------------------- |
| **Authentication**    |
|                       | `/user/signup`          | POST   | Create a new user account         | No                      |
|                       | `/user/login`           | POST   | Authenticate user and get tokens  | No                      |
|                       | `/user/refresh-token`   | POST   | Get new access and refresh tokens | No                      |
| **User Management**   |
|                       | `/user/me`              | GET    | Get current user's profile        | Yes                     |
|                       | `/user/email/:email`    | GET    | Get user details by email         | Yes                     |
|                       | `/user/id/:id`          | GET    | Get user details by ID            | Yes                     |
| **Event Management**  |
|                       | `/user/events`          | GET    | Get list of all events            | No                      |
|                       | `/user/event/:id`       | GET    | Get specific event details        | No                      |
|                       | `/admin/event`          | POST   | Create a new event                | Yes (Admin)             |
|                       | `/admin/event/:id`      | PATCH  | Update an existing event          | Yes (Admin)             |
|                       | `/admin/event/:id`      | DELETE | Delete an event                   | Yes (Admin)             |
| **Ticket Management** |
|                       | `/user/ticket/:eventId` | GET    | Get tickets for a specific event  | Yes                     |
|                       | `/user/ticket/:userId`  | GET    | Get tickets for a specific user   | Yes                     |
| **Admin Operations**  |
|                       | `/admin/make-admin/:id` | PUT    | Promote a user to admin role      | Yes (Admin)             |

## API Documentation

For detailed API documentation, visit the Swagger UI at:

```
http://localhost:3000/api-docs
```

The Swagger documentation includes:

- All available endpoints
- Request/response schemas
- Authentication requirements
- Example requests and responses
