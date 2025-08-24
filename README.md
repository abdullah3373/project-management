# Project Management Web App

A simple project management application built with React, Node.js, and Express. Features user authentication, Kanban board for tasks, and real-time updates.

## Features

- User authentication (demo login)
- Kanban board with task management
- Task creation, editing, and status updates
- Responsive design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the backend server:
```bash
npm run server
```

3. In a new terminal, start the frontend:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Login

- Email: `demo@example.com`
- Password: `password123`

## Project Structure

```
├── server.js          # Express server with API endpoints
├── src/
│   ├── components/    # React components
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── BoardView.jsx
│   │   └── TaskCard.jsx
│   ├── App.jsx        # Main App component
│   ├── main.jsx       # React entry point
│   └── index.css      # Global styles
├── package.json       # Dependencies and scripts
├── vite.config.ts     # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
├── postcss.config.js  # PostCSS configuration
└── index.html         # HTML template
```

## API Endpoints

- `POST /api/auth/login` - User login
- `GET /api/boards` - Get all boards
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task

## Technologies Used

- Frontend: React, Vite, Tailwind CSS
- Backend: Express.js, CORS
- Development: TypeScript, PostCSS

