# Log Ingestion and Querying System

A high-performance, full-stack application designed to ingest and query logs efficiently. Built with **Node.js/Express** for the backend and **React (Vite)** with **Tailwind CSS** for a premium, responsive frontend.

> **Submitted by:** Vivek  
> **Portfolio:** [cv.vivekmind.com](https://cv.vivekmind.com)  
> **Email:** [vivek@vivekmind.com](mailto:vivek@vivekmind.com)

---

## 🚀 Features

- **High-Throughput Ingestion**: Robust HTTP POST API for log ingestion.
- **Advanced Querying**: Filter by Log Level, Resource ID, Message, and Date Range.
- **Atomic Persistence**: Custom concurrency-safe file-based database (`logs.json`).
- **Grafana-Style UI**: Professional, high-density dashboard for monitoring.

---

## 📸 Showcase

### 🔍 Error Log Monitoring
Filter critical issues instantly with color-coded alerts.
![Error Logs](/frontend/public/error.png)

### 🐞 Debug & Inspection
Deep dive into system behavior with detailed debug logs.
![Debug Logs](/frontend/public/debug.png)

### ⏱️ Time-Series Filtering
Precise date-range controls for historical data analysis.
![Time Filter](/frontend/public/time.png)

### 📊 Full Warning Visibility
Track system warnings before they escalate.
![Warning Logs](/frontend/public/all-level.png)

---

## 🛠️ Setup & Run

### Backend
1. Go to backend: `cd backend`
2. Install: `npm install`
3. Seed Data (Optional): `node seed_logs.js`
4. Run: `node index.js`
   - Server: `http://localhost:3000`

### Frontend
1. Go to frontend: `cd frontend`
2. Install: `npm install`
3. Run: `npm run dev`
   - UI: `http://localhost:5173`

---

## 🏗️ Architecture

- **Backend**: Express.js with a custom synchronous file-locking mechanism to ensure data integrity without an external DB.
- **Frontend**: React + Tailwind CSS v4. Implements optimistic UI updates and debounced filtering for seamless performance.
- **Design**: Clean, "White Theme" aesthetic with strict visual hierarchy.

---

*Assignment Project - Crafted by Vivek*
