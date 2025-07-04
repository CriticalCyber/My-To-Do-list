
# To-Do List Manager

A simple, modern, and responsive To-Do List web application built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

- Add, edit, complete, and delete tasks
- Mark tasks as completed with a checkbox and animation
- Clean, responsive, and user-friendly UI
- RESTful API backend with MongoDB for persistent storage

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB (with Mongoose)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/CriticalCyber/todo-list-manager.git
    cd todo-list-manager
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    - Create a `.env` file in the root directory:
      ```
      MONGO_URI=mongodb://localhost:27017/todo_db
      ```

4. **Start MongoDB** (if not running as a service):
    ```bash
    mongod
    ```

5. **Start the server:**
    ```bash
    node server.js
    ```
    The app will run at [http://localhost:3000](http://localhost:3000)

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Add a new task (`{ title: String }`)
- `PUT /api/tasks/:id` - Update a task (edit title or mark complete)
- `DELETE /api/tasks/:id` - Delete a task

## Folder Structure

```
.
├── models/
│   └── Task.js
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── routes/
│   └── tasks.js
├── server.js
└── .env
```

