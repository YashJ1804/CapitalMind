# 📈 CapitalMind

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node](https://img.shields.io/badge/Node.js-22-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-success?logo=mongodb)
![Gemini](https://img.shields.io/badge/AI-Gemini-purple)
![LangGraph](https://img.shields.io/badge/AI-LangGraph-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

> **AI-Powered Investment Intelligence Platform**

CapitalMind is a full-stack AI-powered investment intelligence platform that combines **LangGraph workflows, Google Gemini AI, financial market data, company information, news, and risk analysis** to generate explainable investment recommendations.

The platform supports **USA and Indian market analysis** and provides personalized investment insights through a responsive web application.

---

## 🌐 Live Demo

**Frontend:**
https://capital-mind-eta.vercel.app/

**Backend API:**
https://capitalmind-backend.onrender.com

**GitHub:**
https://github.com/YashJ1804/CapitalMind

---

## 🎯 Why CapitalMind?

Traditional stock screeners provide financial data but leave investors to interpret multiple sources manually.

CapitalMind brings these components together into a single AI-assisted workflow:

* Market and financial data
* Company fundamentals and profiles
* Recent financial news
* Risk analysis
* AI-powered reasoning
* Personalized investment history

The goal is **not to predict the market**, but to provide structured, explainable analysis that can help investors make more informed decisions.

---

# ✨ Features

## 🤖 AI Investment Analysis

* AI-generated **BUY / HOLD / PASS** recommendations
* Investment Score
* AI Confidence Score
* Business summary
* Long-term outlook
* Detailed investment reasoning
* Pros and cons
* Investment risks
* Investor-type recommendation

## 🧠 LangGraph AI Workflow

CapitalMind uses a modular LangGraph workflow to organize the investment analysis process.

The workflow includes:

* Company Search
* Financial Data
* Company Profile
* Latest News
* Risk Analysis
* Gemini Decision Agent

This separates data collection, analysis, and final AI decision-making into dedicated stages.

## 📊 Market Analysis

* USA market analysis
* Indian market analysis
* Company search
* Company profile information
* Market quotes
* Historical stock charts
* Market overview
* Trending stocks
* Market snapshot

## 📰 News Analysis

* Latest company news
* News retrieval from financial data providers
* News considered as part of the investment-analysis workflow

## 📈 Risk Analysis

* Investment risks
* Pros & Cons
* Volatility assessment
* Sector outlook
* Investor-type recommendation
* Risk-aware AI decision generation

## 👤 User Features

* JWT authentication
* Personalized watchlists
* Analysis history
* Cached analysis results
* Responsive dashboard
* Profile management
* Application settings
* In-app notifications

---

# 🔄 Investment Analysis Flow

```text
                    User
                      │
                      ▼
              Company Search
                      │
                      ▼
              ┌───────────────┐
              │   LangGraph   │
              │    Workflow   │
              └───────┬───────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
 Financial Data   Company       Latest News
                  Profile
        └─────────────┼─────────────┘
                      ▼
                Risk Analysis
                      │
                      ▼
             Gemini Decision Agent
                      │
                      ▼
          Investment Recommendation
                      │
                      ▼
                MongoDB Cache
```

---

# 🏗 System Architecture

```text
React + Vite
     │
     │ Axios
     ▼
Express.js API
     │
     ├── Authentication
     ├── Watchlist
     ├── Analysis History
     ├── Notifications
     │
     ▼
Analysis Controller
     │
     ▼
LangGraph Workflow
     │
     ├── Search Node
     ├── Financial Node
     ├── Profile Node
     ├── News Node
     ├── Risk Analysis Node
     │
     ▼
Gemini Decision Agent
     │
     ▼
Investment Recommendation
     │
     ▼
MongoDB Cache
```

---

# 🚀 Tech Stack

## Frontend

* React 19
* Vite
* Tailwind CSS
* Axios
* React Router
* Recharts
* React Hot Toast
* React CountUp

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* LangGraph
* Google Gemini AI
* Express Validator
* Helmet
* Compression
* Rate Limiting

## APIs & Data Sources

* Finnhub API
* Yahoo Finance / Search
* Google Gemini API

## Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

---

# 🧠 LangGraph Workflow

```text
Search Company
      │
      ▼
Company Search
      │
      ▼
┌──────────── Parallel Data Collection ────────────┐
│                                                  │
│   Financial Data    Company Profile    News      │
│                                                  │
└──────────────────────┬───────────────────────────┘
                       │
                       ▼
                Risk Analysis
                       │
                       ▼
             Gemini Decision Agent
                       │
                       ▼
          Investment Recommendation
```

The workflow separates **data retrieval from reasoning**, allowing the final AI decision to be based on multiple sources of financial and company information.

---

# 💾 Data & Performance

CapitalMind uses **MongoDB caching** to reduce repeated analysis requests and unnecessary external API calls.

The application also maintains:

* User analysis history
* Personalized watchlists
* Cached AI analysis results
* User preferences
* Notification data

---

# 🔐 Authentication & Security

The backend implements:

* JWT-based authentication
* Protected API routes
* Request validation
* Rate limiting
* Security headers using Helmet
* Environment-based API credentials
* Password-protected user accounts

Sensitive API keys and database credentials are stored through environment variables and are not committed to the repository.

---

# 📱 Responsive Application

The frontend has been optimized for:

* Desktop
* Tablet
* Mobile

Responsive improvements include:

* Mobile navigation drawer
* Responsive sidebar
* Mobile-friendly top navigation
* Responsive analysis interface
* Adaptive search controls
* Responsive dashboards
* Mobile-friendly notification panel

---

# 🔔 In-App Notifications

CapitalMind includes an in-app notification system for user-facing application events.

Users can manage notification preferences through the application settings.

> Email-based notifications and advanced real-time price alerts remain future enhancements.

---

# 📸 Screenshots

## 🏠 Home

<img width="1871" height="852" alt="CapitalMind Home" src="https://github.com/user-attachments/assets/39df48bd-3470-453c-ba64-a258038aa3b8" />

---

## 🤖 AI Recommendation Dashboard

<img width="1885" height="788" alt="AI Recommendation Dashboard" src="https://github.com/user-attachments/assets/09512cc6-e67f-4059-b028-26ede09929ac" />

---

## 📊 Market Dashboard

<img width="1883" height="617" alt="Market Dashboard" src="https://github.com/user-attachments/assets/e1ce1df8-0134-42d5-9fed-57c0ce39b02d" />

---

## ⭐ Watchlist

<img width="1882" height="842" alt="Watchlist" src="https://github.com/user-attachments/assets/bb6771f6-9733-414d-95c8-17e96ef2686b" />

---

## 📜 Analysis History

<img width="1857" height="796" alt="Analysis History" src="https://github.com/user-attachments/assets/17387355-7dbe-4dfb-ac83-60c41991da32" />

---

# 📂 Project Structure

```text
CapitalMind
│
├── client
│   ├── components
│   ├── pages
│   ├── services
│   ├── context
│   └── ...
│
├── server
│   ├── controllers
│   ├── graph
│   ├── agents
│   ├── providers
│   ├── routes
│   ├── middleware
│   ├── models
│   ├── services
│   ├── tools
│   ├── config
│   └── utils
│
├── README.md
├── CHANGELOG.md
└── V2_FEATURES.md
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/YASHJ1804/CapitalMind.git
cd CapitalMind
```

## 2. Install frontend dependencies

```bash
cd client
npm install
```

## 3. Install backend dependencies

```bash
cd ../server
npm install
```

## 4. Configure environment variables

Create a `.env` file inside the `server` directory.

Create a `.env` file inside the `client` directory.

See the environment configuration below.

## 5. Start the backend

```bash
cd server
npm run dev
```

## 6. Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔑 Environment Variables

## Server `.env`

```env
PORT=

MONGO_URI=

JWT_SECRET=

FINNHUB_API_KEY=

GEMINI_API_KEY=

GEMINI_API_KEY_BACKUP=
```

> `GEMINI_API_KEY_BACKUP` is the variable currently used by the backend Gemini configuration for the fallback AI client.

## Client `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

> Never commit actual API keys, database credentials, JWT secrets, or `.env` files to GitHub.

---

# ☁️ Production Deployment

CapitalMind is deployed using:

```text
Frontend
   │
   ▼
Vercel
   │
   ▼
Render Backend
   │
   ├── MongoDB Atlas
   ├── Finnhub
   ├── Yahoo Finance / Search
   └── Google Gemini
```

### Frontend

* Platform: Vercel
* Root Directory: `client`
* Build Command: `npm run build`
* Output Directory: `dist`

Production API variable:

```env
VITE_API_URL=https://capitalmind-backend.onrender.com/api
```

### Backend

* Platform: Render
* Root Directory: `server`
* Build Command: `npm install`
* Start Command: `npm start`

---

# 🌟 Highlights

* 🤖 AI-powered investment recommendations
* 🧠 LangGraph workflow orchestration
* 🔍 Automated company search
* 📊 USA and Indian market analysis
* 📰 Financial news integration
* 📈 Risk-aware investment analysis
* 💾 MongoDB caching
* 🔐 JWT authentication
* ⭐ Personalized watchlists
* 📜 Analysis history
* 🔔 In-app notifications
* 📱 Responsive UI
* ☁️ Vercel + Render deployment

---

# ⚠️ Limitations

* AI recommendations depend on the quality and freshness of external financial data.
* Market data availability depends on the underlying data providers.
* AI-generated recommendations should not be considered professional financial advice.
* Real-time streaming price updates are not currently implemented.
* Email notifications and advanced real-time price alerts are not currently implemented.

---

# 🚀 Future Improvements

The following features are planned for future versions:

* 📊 Portfolio Tracking & Performance Analytics
* 🤖 Conversational AI Investment Assistant
* 🔐 Google OAuth Authentication
* 🔔 Real-Time Price Alerts
* 📄 PDF Investment Report Export
* 🐳 Docker Containerization
* ☁️ CI/CD Pipeline
* 📱 Progressive Web App (PWA)
* 📧 Email Notifications
* 📈 Advanced Portfolio Analytics

For the detailed V2 roadmap, see:

```text
V2_FEATURES.md
```

---

# 🤝 Contributing

Contributions are welcome.

Feel free to fork the repository, create a feature branch, and submit a Pull Request.

---

# 👨‍💻 Author

**Yash Kumar**

B.Tech Computer Science Engineering
Lovely Professional University

**GitHub:**
https://github.com/YashJ1804

**LinkedIn:**
https://linkedin.com/in/yashk1804

---

# ⭐ Support

If you find CapitalMind useful, consider giving the repository a ⭐ on GitHub.
