# 🏗 Node.js Clean Architecture Boilerplate (TS)

A scalable Node.js boilerplate with **TypeScript**, **Prisma ORM**, **Redis**, **JWT Auth**, **AWS S3 Uploads**, **Rate Limiting**, and more.

## ⚡ Features

- Clean Architecture (Separation of Concerns)
- Express.js + TypeScript
- JWT Auth (Email & OAuth)
- Prisma ORM (PostgreSQL)
- Redis Caching & Rate Limiting
- File Uploads (AWS S3)
- Jest for Unit Testing
- Swagger API Documentation

## 🚀 Quick Setup

1️⃣ **Clone the Repo**

```sh
git clone https://github.com/YOUR_USERNAME/nodejs-clean-boilerplate.git my-app
cd my-app

2️⃣ Install Dependencies
you can run node setup.js and let the project to setup itself or run it manually:
sh
Copy
Edit
npm install
3️⃣ Setup Environment Variables

sh
Copy
Edit
cp .env.example .env
Fill in your database URL, JWT secret, AWS credentials, etc.

4️⃣ Run Database Migrations

sh
Copy
Edit
npx prisma migrate dev --name init
5️⃣ Start the Server

sh
Copy
Edit
npm run dev

📂 **Project Structure**

src/
 ├── config/       # Config files (DB, Redis, AWS)
 ├── controllers/  # Express route controllers
 ├── middlewares/  # Auth, rate limiting, etc.
 ├── models/       # Prisma models
 ├── repositories/ # Data access layer
 ├── routes/       # Express routers
 ├── services/     # Business logic
 ├── tests/        # Unit & Integration tests
 ├── utils/        # Helpers

**Commands**
npm run dev         # Start the API in development mode
npm run build       # Compile TypeScript
npm run start       # Run compiled API
npm run migrate:dev # Run database migrations
npm test           # Run unit tests with Jest

**📜 License**
MIT © Your Name

```
