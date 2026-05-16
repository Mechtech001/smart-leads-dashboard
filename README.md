# Smart Leads Dashboard

A complete production-ready full-stack application built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript.

## Tech Stack

**Frontend:**
- React (Vite)
- TypeScript
- TailwindCSS
- Zustand (State Management)
- React Hook Form + Zod (Form Validation)
- Axios (API Client)
- Lucide React (Icons)

**Backend:**
- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- JSON Web Token (JWT)
- express-validator (Validation)
- bcryptjs (Password Hashing)

## Features

- **Role-Based Access Control (RBAC)**: Admin and Sales user roles with different permissions.
- **Authentication**: JWT-based secure authentication.
- **Lead Management**: Admins can Create, Read, Update, and Delete leads. Sales users can view leads.
- **Advanced Filtering**: Filter leads by Status and Source.
- **Search functionality**: Real-time debounced search by name or email.
- **Sorting**: Sort by newest or oldest leads.
- **Pagination**: Server-side pagination.
- **Export to CSV**: Download the current lead list as a CSV file.
- **Dark Mode**: Persisted dark/light theme toggle.
- **Responsive Design**: Beautiful UI powered by TailwindCSS.
- **Dockerized**: Easy setup and deployment using Docker Compose.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20 recommended)
- MongoDB (if running locally without Docker)
- Docker and Docker Compose (if running with Docker)

## Local Setup (Without Docker)

### 1. Database Setup
Ensure MongoDB is running locally on `mongodb://localhost:27017` or use a MongoDB Atlas URI.

### 2. Backend Setup
1. Open a terminal and navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (you can copy `.env.example`):
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The server will run on http://localhost:5000*

### 3. Frontend Setup
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (you can copy `.env.example`):
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on http://localhost:3000*

## Local Setup (With Docker)

To run the entire stack (MongoDB, Backend, Frontend) with a single command:

1. Make sure Docker is running on your machine.
2. From the root directory of the project, run:
   ```bash
   docker-compose up --build
   ```
3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Environment Variables

### Server (`server/.env`)
- `PORT`: Port for the Express server (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for signing JWT tokens
- `NODE_ENV`: Environment ('development' or 'production')

### Client (`client/.env`)
- `VITE_API_URL`: URL of the backend API (e.g., http://localhost:5000/api)

## Default Test Credentials

You can register new users through the app. To test roles, register an account, and select the desired role (Admin or Sales).

**Example Accounts to create:**
- **Admin**: `admin@example.com` / `password123` (Select 'Administrator' role)
- **Sales**: `sales@example.com` / `password123` (Select 'Sales Representative' role)

## Folder Structure

```
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── api/            # API calls with Axios
│   │   ├── components/     # Reusable UI and Layout components
│   │   ├── hooks/          # Custom React hooks (useAuth, useLeads)
│   │   ├── pages/          # Application routes/pages
│   │   ├── store/          # Zustand global state
│   │   ├── types/          # TypeScript interfaces
│   │   └── utils/          # Helper functions (CSV export, formatting)
│   └── Dockerfile          # Frontend Docker configuration
│
├── server/                 # Backend Express API
│   ├── src/
│   │   ├── config/         # Environment and DB config
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth, Role, Error handling
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API endpoints definitions
│   │   ├── types/          # TypeScript types & Express augmentation
│   │   ├── utils/          # Custom errors, Response wrappers
│   │   └── validators/     # Request validation (express-validator)
│   ├── API_DOCS.md         # Detailed API Documentation
│   └── Dockerfile          # Backend Docker configuration
│
└── docker-compose.yml      # Multi-container Docker configuration
```

## API Documentation

Detailed API documentation is available in `server/API_DOCS.md`. It covers all authentication and lead management endpoints, request/response formats, and required roles.

## Deployment Notes

- **Database:** MongoDB Atlas is recommended for production. Update `MONGODB_URI` accordingly.
- **Backend (Server):** Can be easily deployed to Render, Railway, or Heroku. Ensure you set the environment variables in the dashboard.
- **Frontend (Client):** Ideal for Vercel or Netlify. Set the build command to `npm run build` and publish directory to `dist`. Set `VITE_API_URL` to your deployed backend URL.
