# 🗨️ EasyChat

EasyChat is a simple real-time chat application built with **Angular 20** (frontend) and **Express.js** (backend).  
It supports **public broadcast chats**, **private authenticated chats**, and **direct messages (DMs)**.  
Authentication is handled via **Keycloak**, and the entire application can be started using **Docker Compose**.

---

## ✅ Features

- 🔓 **Public Broadcast Chat** — accessible without authentication
- 🔐 **Private & Direct Chats** — available for authenticated users
- 👤 **User Identity via Keycloak** — users are displayed with username & avatar
- ⚡ **Real-time messaging via WebSockets**
- 🐳 **Fully containerized with Docker**

---

## 📦 Prerequisites

Before running the application, ensure you have the following installed:

| Dependency | Recommended Version |
|------------|--------------------|
| **Node.js** | `>=18.x` |
| **npm** | `>=9.x` |
| **Angular CLI** | `>=20.x` |
| **Docker** | Latest |
| **Docker Compose** | Latest |
| **IntelliJ IDEA / WebStorm (optional)** | For development setup |

---

## 🚀 Getting Started (via Docker Compose)

1. Clone the repository:

```bash
git clone https://github.com/your-username/easychat.git
cd easychat
```

2. Start the full stack (Frontend + Backend + Keycloak + Database):
```bash
docker-compose up --build
```
3. Open the app in your browser: [http://localhost:4200](http://localhost:4200)
4. Default Keycloak admin panel (if enabled):
http://localhost:8080
User: admin / change_me

## 🛠️ Local Development Setup (IntelliJ / WebStorm or VS Code)

You can also run the application locally without Docker for development purposes.

### ✅ Frontend (Angular 20)

1. Open the `easychat-frontend/` folder in your IDE
2. Install dependencies:
```bash
npm install
```
3. Start the dev server:
```bash
npm start
```
4. The Angular application will be available at: [http://localhost:4200](http://localhost:4200)

### ✅ Backend (Angular 20)

1. Open the `easychat-backend/` folder in your IDE
2. Install dependencies:
```bash
npm install
```
3. Start the dev server:
```bash
npm run dev
```
4. The Angular application will be available at: [http://localhost:3000](http://localhost:3000)

