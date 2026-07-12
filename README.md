# 📈 CapitalMind

> **AI-Powered Investment Intelligence Platform**

CapitalMind is an AI-driven stock analysis platform that combines **LangGraph workflows**, **Google Gemini AI**, and **live financial market data** to generate intelligent investment recommendations for publicly traded companies.

The platform analyzes company fundamentals, market performance, recent news, and risk factors to provide actionable insights for investors.

---

## ✨ Features

### 🤖 AI Investment Analysis
- AI-generated BUY / HOLD / PASS recommendations
- Investment Score (0–100)
- AI Confidence Score
- Business summary
- Long-term outlook
- Detailed reasoning

### 📊 Live Market Data
- Company Profile
- Real-time Market Quotes
- 30-Day Stock Price Chart
- Market Overview
- Trending Stocks
- Market Snapshot

### 📰 News Analysis
- Latest company news
- AI considers recent news before making recommendations

### 📈 Risk Analysis
- Investment Risks
- Pros & Cons
- Volatility Assessment
- Sector Outlook
- Investor Type Recommendation

### 👤 User Features
- JWT Authentication
- Watchlist
- Analysis History
- Cached AI Results
- Responsive Dashboard

---

# 🏗 Architecture

```
React (Vite)
      │
Axios API
      │
Express.js
      │
Analysis Controller
      │
LangGraph Workflow
      │
 ┌───────────────┬───────────────┬───────────────┐
 │               │               │
Search Node   Financial Node   News Node
 │               │               │
 └───────────────┼───────────────┘
                 │
          Risk Analysis Node
                 │
          Gemini Decision Agent
                 │
          Investment Recommendation
                 │
              MongoDB Cache
```

---

# 🚀 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- React Hot Toast
- React CountUp
- Recharts

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- LangGraph
- Google Gemini AI

## APIs

- Finnhub API
- Google Gemini API

---

# 🧠 LangGraph Workflow

```
Search Company
      │
      ▼
Company Search
      │
      ▼
──────────── Parallel Execution ────────────

Financial Data

Company Profile

Latest News

────────────────────────────────────────────

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

---

# 📂 Project Structure

```
CapitalMind
│
├── client
│   ├── components
│   ├── pages
│   ├── services
│   └── context
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
│   └── utils
│
├── README.md
├── CHANGELOG.md
└── V2_FEATURES.md
```

---

# 📸 Screenshots

## Home

<img width="1871" height="852" alt="image" src="https://github.com/user-attachments/assets/39df48bd-3470-453c-ba64-a258038aa3b8" />


---

## AI Recommendation Dashboard

<img width="1885" height="788" alt="image" src="https://github.com/user-attachments/assets/09512cc6-e67f-4059-b028-26ede09929ac" />


---

## Market Dashboard

<img width="1883" height="617" alt="image" src="https://github.com/user-attachments/assets/e1ce1df8-0134-42d5-9fed-57c0ce39b02d" />


---

## Watchlist

<img width="1882" height="842" alt="image" src="https://github.com/user-attachments/assets/bb6771f6-9733-414d-95c8-17e96ef2686b" />


---

## Analysis History

<img width="1857" height="796" alt="image" src="https://github.com/user-attachments/assets/17387355-7dbe-4dfb-ac83-60c41991da32" />


---

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/CapitalMind.git
```

Go into the project

```bash
cd CapitalMind
```

Install frontend

```bash
cd client
npm install
```

Install backend

```bash
cd ../server
npm install
```

Run backend

```bash
npm run dev
```

Run frontend

```bash
cd ../client
npm run dev
```

---

# 🔑 Environment Variables

## Server (.env)

```env
PORT=

MONGO_URI=

JWT_SECRET=

FINNHUB_API_KEY=

GEMINI_API_KEY=

GEMINI_API_KEY_2=
```

## Client (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 🌟 Highlights

- AI-powered investment recommendations
- LangGraph workflow orchestration
- Parallel data collection
- MongoDB caching
- JWT authentication
- Responsive UI
- Market Dashboard
- Watchlist
- Analysis History

---

# 🚀 Future Roadmap

See

```
V2_FEATURES.md
```

Upcoming features include

- Indian Stock Market Support
- Portfolio Tracking
- AI Chat Assistant
- Google Login
- Price Alerts
- Docker Deployment

---

# 🤝 Contributing

Contributions are welcome.

Feel free to fork the repository and submit a Pull Request.

---

# 👨‍💻 Author

**Yash Kumar**

B.Tech Computer Science Engineering

Lovely Professional University

GitHub:
https://github.com/YOUR_USERNAME

LinkedIn:
https://linkedin.com/in/YOUR_PROFILE

---

# ⭐ If you like this project

Please consider giving it a ⭐ on GitHub.
