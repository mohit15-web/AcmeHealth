# acmeHealth

A simple prototype demonstrating login functionality and a core feature for weight progress tracking. Built using the **MERN stack**.

---

## 💡 Overview
- User Signup & Login (JWT-based authentication)
- Weight Progress Tracking (mock/static data)
- RESTful APIs using Express + MongoDB

---

## 📂 Folder Structure
```
acmeHealth/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
├── frontend/
│   └── [React App]
├── README.md
```

---

## 🚀 Getting Started

### 🔧 Clone and Setup
```bash
git clone https://github.com/mohit15-web/AcmeHealth.git
cd acmeHealth
```

### 📦 Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

Start Backend:
```bash
npm start
```

### 💻 Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

---

## 🔌 API Endpoints

### 🔐 Auth Routes
- `POST /api/auth/signup` – Register a new user
- `POST /api/auth/login` – Login and receive a JWT

### 📈 Weight Progress Routes
- `GET /api/weight/history` – Get mock weight progress data
- `POST /api/weight/add` – Add weight
- `POST /api/weight/update/:id` – Update weight
- `POST /api/weight/delete/:id` – Delete weight

---

## 🧪 Demo Instructions
- Run backend and frontend locally
- Use Postman or browser to test API routes

---

## 🔗 GitHub Repository
[https://github.com/your-username/acmeHealth](https://github.com/mohit15-web/AcmeHealth)

---


