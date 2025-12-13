# Mark One — Frontend

A fast, modern frontend for the Mark One newsletter analysis platform. This UI lets users run newsletter and market analyses, track progress in real time, and view detailed issue-level insights.

---

## 🚀 Overview

Mark One provides:

* Real-time analysis progress via WebSockets
* Insight dashboards (tone, intent, summaries, engagement)
* Issue listings with detailed metrics
* Drawer UI for deep-dive issue analytics
* Manual issue submission with live progress
* Global banner notifications
* Sidebar with analysis history

---

## 🧱 Tech Stack

* **ReactJS**
* **React Router**
* **TailwindCSS**
* **WebSockets** for progress streams
* **Context API** for global + domain state
* **Lucide Icons**

---

## 📁 Structure

```
src/
  api/              # API helpers & request builders
  components/       # Navbar, Header, Insights, Issues, Drawer, Banner
  context/          # AppContext, AnalysisContext
  hooks/            # useAnalysisProgress
  pages/            # LandingPage, Analysis
  utils/            # Validation & helpers
```

---

## ▶️ Development

Install dependencies:

```sh
npm install
```

Run development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

---

## 🌐 Environment

Create `.env`:

```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

---

## 📌 Features

* Start newsletter/market analysis
* Real-time job progress UI
* Manual issue analysis with dedicated progress tracking
* Persisted analysis history in sidebar
* Clean, responsive dashboard layout

---

## 🧠 Notes

This frontend expects:

* REST endpoints for analysis + issues
* WebSocket channels for progress updates

---

## 📜 License

Proprietary — internal use only.

