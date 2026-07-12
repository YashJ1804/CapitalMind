# 🚀 CapitalMind Deployment Guide

This document contains the deployment details, environment variables, and deployment workflow for **CapitalMind v1.0**.

---

# 🌐 Live Deployment

## Frontend

**Platform:** Vercel

**Live URL:**

https://capital-mind-eta.vercel.app

---

## Backend

**Platform:** Render

**Live URL:**

https://capitalmind-backend.onrender.com

---

## Database

**Platform:** MongoDB Atlas

**Cluster:**

capitalmind-cluster

---

# 🛠 Deployment Architecture

```
                 Vercel
             (React Frontend)
                     │
                     │ HTTPS
                     ▼
      Render (Express + LangGraph API)
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
 Google Gemini API          Finnhub API
        │
        ▼
 MongoDB Atlas
```

---

# 📦 Services Used

| Service | Purpose |
|----------|----------|
| Vercel | Frontend Hosting |
| Render | Backend Hosting |
| MongoDB Atlas | Cloud Database |
| Google Gemini | AI Investment Analysis |
| Finnhub | Stock Market Data |

---

# 🔑 Backend Environment Variables

Create a `.env` file inside the **server** directory.

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

FINNHUB_API_KEY=

GEMINI_API_KEY=

GEMINI_API_KEY_2=
```

---

# 🔑 Frontend Environment Variables

Create a `.env` file inside the **client** directory.

```env
VITE_API_URL=http://localhost:5000/api
```

### Production

Configured inside Vercel:

```env
VITE_API_URL=https://capitalmind-backend.onrender.com/api
```

---

# 📁 Deployment Configuration

## Backend (Render)

**Root Directory**

```
server
```

**Build Command**

```bash
npm install
```

**Start Command**

```bash
npm start
```

---

## Frontend (Vercel)

**Root Directory**

```
client
```

**Framework**

```
Vite
```

**Build Command**

```bash
npm run build
```

**Output Directory**

```
dist
```

---

# 🚀 Local Development

## Backend

```bash
cd server

npm install

npm run dev
```

---

## Frontend

```bash
cd client

npm install

npm run dev
```

---

# 🔄 Deployment Workflow

## Backend

```bash
git add .

git commit -m "your message"

git push
```

Render automatically redeploys.

---

## Frontend

```bash
git add .

git commit -m "your message"

git push
```

Vercel automatically redeploys.

---

# 📌 Version

Current Stable Release

```
v1.0.0
```

Git Tag

```bash
git tag -a v1.0.0 -m "CapitalMind Version 1"
git push origin v1.0.0
```

---

# 📋 Deployment Checklist

- [x] MongoDB Atlas Connected
- [x] Backend Deployed on Render
- [x] Frontend Deployed on Vercel
- [x] JWT Authentication Working
- [x] AI Analysis Working
- [x] Market Snapshot Working
- [x] Watchlist Working
- [x] Analysis History Working
- [x] Responsive UI
- [x] README Updated
- [x] GitHub Repository Published

---

# ⚠️ Notes

- Render free instances may enter a sleep state after inactivity. The first request can take up to 60 seconds while the backend wakes up.
- Never commit `.env` files or API keys to the repository.
- Update environment variables directly through the hosting platforms (Render and Vercel) when rotating credentials.

---

# 🔮 Future Deployment Improvements

- Docker Support
- CI/CD with GitHub Actions
- Custom Domain
- HTTPS Health Checks
- Redis Caching
- Automated Testing Pipeline
- Kubernetes Deployment
- Multi-Environment (Development / Staging / Production)

---

**Last Updated:** July 2026

**Project:** CapitalMind v1.0
