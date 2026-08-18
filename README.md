# 📦 Inventory Reservation System

A full-stack **Inventory Reservation System** built with **NestJS**, **React**, **Prisma ORM**, and **PostgreSQL**.

The application allows users to browse products, reserve inventory, complete orders, and automatically restore stock when reservations expire after 10 minutes.

---

## 📖 Table of Contents

- Project Overview
- Features
- Tech Stack
- Architecture
- Folder Structure
- Database Schema
- Reservation Workflow
- API Endpoints
- Installation
- Environment Variables
- Running the Application
- Running Tests
- Screenshots
- Future Improvements
- Author

---

# 🚀 Project Overview

This application demonstrates a complete inventory reservation workflow.

Users can:

- View available products
- Reserve a product
- Complete an order
- Automatically release reservations after expiry
- Automatically restore inventory
- Track reservation countdown in real-time

The project showcases backend development with NestJS and Prisma, frontend development with React and Material UI, and scheduled background processing using Cron Jobs.

---

# ✨ Features

## Backend

- Product Management
- Reservation Management
- Order Management
- PostgreSQL Database
- Prisma ORM
- DTO Validation
- REST API
- Automatic Reservation Expiry
- Automatic Stock Restoration
- Cron Job Scheduler
- Unit Testing with Jest

---

## Frontend

- Responsive Material UI
- Product Listing
- Reservation Details
- Countdown Timer
- Status Chips
- Snackbar Notifications
- Loading Spinner
- Empty State
- Responsive Layout

---

# 🛠 Tech Stack

## Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Jest
- Nest Schedule

---

## Frontend

- React
- Vite
- Material UI
- Axios
- React Router

---

## Database

- PostgreSQL

---

# 🏗 System Architecture

```text
                    React Frontend
                           │
                           │ Axios
                           ▼
                  NestJS REST API
                           │
                           ▼
                    Prisma ORM
                           │
                           ▼
                     PostgreSQL
                           │
                           ▼
                 Reservation Cron Job
```

---

# 📂 Folder Structure

```text
inventory-reservation-system
│
├── backend
│   ├── prisma
│   │   ├── migrations
│   │   └── schema.prisma
│   │
│   ├── src
│   │   ├── order
│   │   ├── product
│   │   ├── prisma
│   │   ├── reservation
│   │   └── main.ts
│   │
│   ├── test
│   ├── package.json
│   └── tsconfig.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── constants
│   │   ├── pages
│   │   ├── types
│   │   ├── utils
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   └── package.json
│
├── assets
│
└── README.md
```

---

# 🗄 Database Schema

```text
Product
-------
id
name
description
price
stock

        │
        │ 1
        │
        │
        ▼
Reservation
-----------
id
productId
quantity
status
expiresAt

        │
        │ 1
        │
        ▼
Order
-----
id
reservationId
productId
quantity
totalAmount
```

---

# 🔄 Reservation Workflow

```text
User

 │

 ▼

View Products

 │

 ▼

Reserve Product

 │

 ▼

Decrease Stock

 │

 ▼

Reservation Created

 │

 ▼

10 Minute Countdown

 ├───────────────┐
 │               │
 │               │
 ▼               ▼

Complete      Reservation
Order         Expired

 │               │

 ▼               ▼

Create Order   Restore Stock

 │               │

 ▼               ▼

Completed     Expired
```

---

# ⏰ Reservation Expiry

A scheduled Cron Job runs every 30 seconds.

It performs the following actions:

- Checks expired reservations
- Updates reservation status to **EXPIRED**
- Restores reserved stock back to the product inventory

---

# 📡 REST API

## Products

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/products` | Get all products |
| POST | `/products` | Create product |

---

## Reservations

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/reservations` | Reserve product |
| GET | `/reservations/:id` | Get reservation details |

---

## Orders

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/orders` | Complete reservation |

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/inventory-reservation-system.git
```

---

## Backend

```bash
cd backend

npm install

npm run start:dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **backend** directory.

```env
DATABASE_URL=your_postgresql_connection_string
```

---

# ▶ Running the Application

## Backend

```bash
cd backend

npm run start:dev
```

Server:

```
http://localhost:3000
```

---

## Frontend

```bash
cd frontend

npm run dev
```

Application:

```
http://localhost:5173
```

---

# 🧪 Running Tests

```bash
cd backend

npm test
```

Current project status:

- Product Tests
- Reservation Tests
- Order Tests
- Controller Tests
- Prisma Service Tests

---

# 📸 Screenshots

Create an **assets** folder and place screenshots inside it.

```
assets/

products-page.png

reservation-page.png

expired-reservation.png

postman-testing.png
```

Then GitHub will automatically display them.

## Products Page

```markdown
![Products](assets/products-page.png)
```

---

## Reservation Page

```markdown
![Reservation](assets/reservation-page.png)
```

---

## Expired Reservation

```markdown
![Expired](assets/expired-reservation.png)
```

---

## API Testing

```markdown
![Postman](assets/postman-testing.png)
```

---

# 📈 Future Improvements

- User Authentication
- Role Based Authorization
- Product Images
- Product Search
- Pagination
- Admin Dashboard
- Docker Support
- CI/CD Pipeline
- Redis Caching
- Email Notifications
- WebSocket Live Updates

---

# 💡 Design Decisions

- Prisma ORM was used for type-safe database access.
- PostgreSQL was selected as the relational database.
- Cron Jobs automatically restore inventory after reservation expiry.
- Material UI provides a responsive and consistent user interface.
- The project follows a modular NestJS architecture for maintainability.
- Unit tests were added for controllers and services.

---

# 👨‍💻 Author

**Abin Das**

Master's in IT Management | Full Stack Developer

### Tech Stack

- React
- TypeScript
- NestJS
- Prisma
- PostgreSQL
- Material UI
- REST APIs

---

⭐ If you found this project useful, consider giving it a star.