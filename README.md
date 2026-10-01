# 📓 iNotebook - Cloud Notes Application

A full-stack MERN application for managing, organizing, and securing your notes in the cloud.

---

## 🌟 Key Features

- **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens) with salted `bcryptjs` password hashing.
- **Notes CRUD**: Create, read, edit, and delete notes in real time.
- **Search & Filters**: Instant full-text search across titles, descriptions, and tags with dynamic tag filtering.
- **One-Click Copy**: Copy note title & content directly to clipboard.
- **Delete Protection**: Confirmation dialog before deleting notes to prevent accidental data loss.
- **Responsive UI**: Built with React 19, Tailwind CSS v4, and modern responsive components.
- **Resilient Backend**: Express with Helmet security headers, rate limiting on auth endpoints, input validation using `express-validator`, and MongoDB Atlas integration.

---

## 🏗️ Architecture & Tech Stack

```
notebook/
├── client/          # Frontend (React 19, Vite, Tailwind CSS v4, React Router 7)
│   ├── src/
│   │   ├── components/    # Navbar, Home, Notes, NoteItem, Addnote, Login, Signup, About, Alert
│   │   ├── context/       # NoteContext & NotesState (React Context API)
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env
└── server/          # Backend (Node.js, Express, MongoDB Atlas, JWT, Mongoose)
    ├── middleware/  # fetchuser (JWT verification), validate, errorHandler
    ├── models/      # User & Note Mongoose schemas
    ├── routes/      # Auth routes (/api/auth) & Notes routes (/api/notes)
    ├── db.js        # MongoDB connection
    ├── index.js     # Express server setup
    └── .env
```

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd server
npm install
```

Create/verify `server/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:5173
```

Start the backend server:
```bash
npm run dev    # or npm start
```
The server will run on `http://localhost:5000`.

### 2. Frontend Setup

```bash
cd client
npm install
```

Create/verify `client/.env`:
```env
VITE_API_URL=http://localhost:5000
```

Start the Vite development server:
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 📡 API Endpoints

### Authentication (`/api/auth`)
| Method | Route | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/createuser` | Register a new user | No |
| POST | `/api/auth/login` | Authenticate existing user | No |
| POST | `/api/auth/getuser` | Fetch current user profile | Yes (`auth-token`) |

### Notes (`/api/notes`)
| Method | Route | Description | Auth Required |
|---|---|---|---|
| GET | `/api/notes/fetchallnotes` | Get all user notes (supports `?search=term`) | Yes (`auth-token`) |
| POST | `/api/notes/addnote` | Create a new note | Yes (`auth-token`) |
| PUT | `/api/notes/updatenote/:id` | Update an existing note | Yes (`auth-token`) |
| DELETE | `/api/notes/deletenote/:id` | Delete a note | Yes (`auth-token`) |

---

## 🌐 Deployment Guide

### Option 1: Vercel (Frontend) + Render (Backend) [Recommended]

#### Step 1: Deploy Backend to Render (Free)
1. Push your code to a GitHub repository.
2. Sign in to [Render](https://dashboard.render.com/) and click **New +** > **Web Service**.
3. Connect your repository.
4. Set the following settings:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:
   - `PORT`: `5000`
   - `MONGO_URI`: `your_mongodb_atlas_connection_string`
   - `JWT_SECRET`: `your_random_secret_key`
   - `JWT_EXPIRES_IN`: `7d`
   - `CLIENT_ORIGIN`: `https://your-frontend.vercel.app` *(or leave blank; CORS already allows `*.vercel.app`)*
6. Click **Deploy Web Service**.
7. Copy your backend URL (e.g., `https://inotebook-backend.onrender.com`).

#### Step 2: Deploy Frontend to Vercel (Free)
1. Sign in to [Vercel](https://vercel.com/) and click **Add New** > **Project**.
2. Select your GitHub repository.
3. In project configuration:
   - **Root Directory**: Click edit and select `client`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_URL`: Your Render backend URL from Step 1 (e.g., `https://inotebook-backend.onrender.com`)
5. Click **Deploy**.
6. That's it! Your full-stack notes app is live.

---

### Option 2: Render (Single Full-Stack Service)
To deploy both frontend and backend as a single service on Render:
1. In Render, select **Root Directory**: `.` (root of the repo).
2. Set **Build Command**: `cd client && npm install && npm run build && cd ../server && npm install`
3. Set **Start Command**: `cd server && npm start`
4. Add the server environment variables (`MONGO_URI`, `JWT_SECRET`, etc.).
5. The Express server will automatically serve the built client from `client/dist`.

---

## 📜 License
MIT

