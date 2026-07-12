# LLM Development Log

## Project

**CapitalMind – AI-Powered Investment Intelligence Platform**

---

# Purpose

This document summarizes how an LLM was used during the development of CapitalMind.

The LLM was used as an engineering assistant for brainstorming, debugging, architecture discussions, and implementation guidance. All design decisions, coding, testing, and integration were reviewed and implemented manually.

---

# Development Timeline

## Phase 1 – Project Planning

### Objective

Build an AI-powered platform capable of analyzing publicly traded companies and generating explainable investment recommendations.

### Discussions with the LLM

- Evaluated different project ideas.
- Decided to focus on investment analysis because it combines AI, APIs, backend engineering, and frontend development.
- Identified the core modules:
  - Authentication
  - Stock Analysis
  - Watchlist
  - Dashboard
  - History

### Outcome

Defined the overall project scope and initial architecture.

---

# Phase 2 – Technology Selection

Several alternatives were considered.

## Frontend

Selected:

- React
- Vite
- Tailwind CSS

Reason:

- Fast development experience
- Responsive UI
- Component-based architecture

---

## Backend

Selected:

- Node.js
- Express.js

Reason:

- Lightweight
- Large ecosystem
- Easy REST API development

---

## Database

Selected:

- MongoDB Atlas

Reason:

- Flexible document schema
- Easy integration with Mongoose

---

## AI Model

Evaluated different LLM providers.

Selected:

- Google Gemini

Reason:

- Strong reasoning capability
- Simple API integration
- Suitable for structured financial analysis

---

# Phase 3 – Designing the AI Workflow

The LLM helped brainstorm an AI pipeline.

Final workflow:

1. Search company
2. Retrieve company profile
3. Retrieve financial information
4. Retrieve recent news
5. Combine all information
6. Generate AI investment recommendation
7. Store analysis in MongoDB

This workflow was later implemented using LangGraph.

---

# Phase 4 – Prompt Engineering

Multiple prompt iterations were tested.

Goals:

- Produce consistent BUY / HOLD / PASS recommendations.
- Keep reasoning concise.
- Include confidence score.
- Include risks and long-term outlook.
- Avoid hallucinated financial data.

Several prompt refinements were made until the responses became sufficiently structured for production use.

---

# Phase 5 – Backend Development

The LLM assisted with:

- Express routing
- JWT authentication
- MongoDB schema design
- Error handling
- REST API organization

During implementation, several issues were resolved, including:

- Authentication flow
- API routing
- CORS configuration
- Environment variables
- Deployment configuration

---

# Phase 6 – Frontend Development

The frontend was built incrementally.

The LLM was used to discuss:

- Component structure
- Responsive layouts
- Dashboard organization
- Search workflow
- User experience improvements

Major components included:

- Landing Page
- Search
- Dashboard
- Watchlist
- History
- AI Recommendation Panel

---

# Phase 7 – UI Improvements

Several iterations focused on improving the user interface.

Changes included:

- Improved navigation bar
- Better responsiveness
- Landing page redesign
- Enhanced dashboard layout
- Improved recommendation cards
- Interactive charts
- Market snapshot section

The objective was to improve usability while maintaining a clean design.

---

# Phase 8 – Deployment

Deployment required several iterations.

Issues encountered included:

- Vercel configuration
- Render deployment
- Environment variables
- API endpoint configuration
- CORS issues
- Authentication redirects

Each issue was tested and resolved before the final deployment.

---

# Phase 9 – Testing

Testing included:

- User registration
- Login
- JWT authentication
- Stock analysis
- Dashboard
- Watchlist
- History
- Responsive layout
- Deployment validation

Example companies tested:

- Apple
- NVIDIA
- Microsoft
- Tesla
- Amazon

---

# Lessons Learned

This project provided practical experience with:

- AI application development
- Prompt engineering
- REST API development
- LangGraph workflow orchestration
- MongoDB data modeling
- JWT authentication
- Frontend/backend integration
- Cloud deployment
- Production debugging

---

# Reflection

The LLM acted as a development assistant rather than a code generator.

Its primary value was:

- discussing architecture,
- explaining concepts,
- suggesting implementation approaches,
- debugging errors,
- reviewing design decisions,
- and improving code quality.

Every feature was tested, integrated, and validated before being incorporated into the final application.

---

# Future Improvements

Future iterations of CapitalMind will focus on:

- Portfolio management
- Indian stock market support
- AI investment chatbot
- Real-time alerts
- Docker deployment
- CI/CD automation
- Enhanced caching
- Portfolio analytics
