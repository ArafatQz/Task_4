
---

# 🎉 Event Management Platform

A modern, fast, and responsive web app for organizing and tracking events. It allows users to easily create, view, and manage events and attendees through a clean, intuitive dashboard.

---

## ✨ Features

* 🔐 **User Authentication** – Secure login system to protect your data.
* 📅 **Event Management** – Quickly create, update, or delete events.
* 📊 **Interactive Dashboard** – Centralized control to manage events and track attendee stats.
* 👥 **Attendee Tracking** – Easily view and manage attendees for each event.
* 📱 **Responsive Design** – Works smoothly across desktops, tablets, and mobile devices.

<div align="center">
  <img src="https://github.com/user-attachments/assets/4e6ed950-4b85-46f9-b445-b3f68c91c0ce" width="400"/>
  <img src="https://github.com/user-attachments/assets/01f6a991-b467-429b-ac56-9713eabaca89" width="400"/>
  <img src="https://github.com/user-attachments/assets/698fef97-b645-4f79-82bf-e9b09dcc393d" width="400"/>
  <img src="https://github.com/user-attachments/assets/1f4ea29a-a4b5-43d8-bec0-347427a6bc9d" width="400"/>
</div>

---

## 🛠 Tech Stack

This project is built using a modern frontend stack:

* **Frontend:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Routing:** [React Router](https://reactrouter.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
* **Data Fetching:** [React Query (TanStack)](https://tanstack.com/query/latest)
* **API Requests:** [Axios](https://axios-http.com/)
* **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
* **UI Components:** [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)

---

## 🚀 Getting Started

Follow these steps to run the app locally:

### ✅ Prerequisites

Install the following tools:

* [Node.js](https://nodejs.org/) (v18+ recommended)
* [npm](https://www.npmjs.com/) or [Yarn](https://classic.yarnpkg.com/)

### 📦 Installation

```bash
# Clone the repo
git clone <YOUR_REPOSITORY_URL>

# Go to project directory
cd project

# Install dependencies
npm install
```

### ▶️ Running Locally

To start the development server:

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

Here are some useful commands you can run:

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Build the app for production         |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Lint the code using ESLint           |

---

## 🗂 Project Structure

```
src/
├── api/         # API call handlers
├── assets/      # Images, fonts, and other static files
├── components/  # Reusable UI components
├── lib/         # Helper functions and utilities
├── pages/       # Main views/routes of the app
├── routes/      # Route definitions (e.g., private routes)
├── stores/      # Zustand state management stores
├── App.tsx      # Root component containing routing logic
└── main.tsx     # Application entry point
```

---
