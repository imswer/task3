# 🚀 Command Manager

## 🌟 Overview
Command Manager is a sleek, user-friendly web application built using modern technologies to help you create, manage, and execute shell commands seamlessly. With a minimal yet powerful UI, you can add, edit, delete, and run commands with ease.

## ✨ Features
- 📌 *Add, Edit & Delete Commands*: Manage your shell commands effortlessly.
- ⚡ *Execute Commands*: Run commands instantly from the UI.
- 🔍 *Search & Filter*: Quickly find the commands you need.
- 📜 *View Command Output*: See real-time execution results.
- 🎨 *Modern UI*: Built with Ant Design for an elegant user experience.

## 🛠 Technologies Used
- *Frontend*: React 19, TypeScript, Ant Design, Axios
- *Backend*: Node.js with Express
- *Database*: JSON-based storage (or any configured DB)

## 📦 Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js (>=16.x)
- npm or yarn

### 🚀 Clone the Repository
sh
git clone https://github.com/your-repo/command-manager.git
cd command-manager


### 📥 Install Dependencies
sh
npm install
# or
yarn install

#### Required Modules
sh
npm install express cors axios body-parser nodemon

For frontend:
sh
npm install react-router-dom @ant-design/icons antd axios


### 🔥 Start the Frontend
sh
npm start
# or
yarn start

Runs the React app on http://localhost:3000/

### 🚀 Start the Backend
Navigate to the backend directory and run:
sh
node server.js

Runs the Express server on http://localhost:5000/

## 📡 API Endpoints
### 📌 Fetch Commands
sh
GET /commands

### ➕ Add Command
sh
POST /commands
Body: { "name": "Ping Google", "command": "ping google.com", "description": "connects to google" }

### 🛠 Edit Command
sh
PUT /commands/:id
Body: { "name": "New Name", "command": "new command", "description": "updated description" }

### ❌ Delete Command
sh
DELETE /commands/:id

### ⚡ Execute Command
sh
POST /execute/:id


## 🔧 Troubleshooting
- *404 Error*: Ensure the backend is running and API endpoints match frontend requests.
- *Command Not Found*: Some commands may not be available on all OS platforms (e.g., ifconfig on Windows).

## 🚀 Future Enhancements
- 🔐 User authentication
- 📊 Command execution history
- ☁ Cloud database support

## 📜 License
This project is open-source under the MIT License.
