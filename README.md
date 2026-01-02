# To-Do List Application

Full-stack CRUD To-Do List application with authentication.

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Express.js + Node.js
- **Database**: MongoDB

## Features

- User authentication (signup/login with JWT)
- Create, Read, Update, Delete todos
- Real-time updates (polling every 2 seconds)
- Edit todos inline
- Toggle completion status
- Beautiful, responsive UI

## Prerequisites

- Node.js (v16 or higher)
- MongoDB installed and running on localhost:27017

## Setup Instructions

### 1. Start MongoDB

Make sure MongoDB is running on your local machine:

```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
net start MongoDB
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ..
npm install
```

### 3. Configure Environment

The backend is pre-configured to connect to MongoDB at `mongodb://localhost:27017/todoapp`.

If you need to change the MongoDB URI or JWT secret, edit `server/.env`:

```
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
```

### 4. Run the Application

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

The backend will run on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The frontend will run on http://localhost:5173

### 5. Use the Application

1. Open http://localhost:5173 in your browser
2. Sign up with an email and password
3. Start adding todos!

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new account
- `POST /api/auth/login` - Login to existing account

### Todos (requires authentication)
- `GET /api/todos` - Get all todos for the authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo (title or completed status)
- `DELETE /api/todos/:id` - Delete a todo

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Protected API routes
- Users can only access their own todos
