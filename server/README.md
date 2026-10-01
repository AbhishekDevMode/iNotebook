# iNotebook Backend

Express + MongoDB + JWT backend for a cloud notes app.

## Setup
```bash
npm install
cp .env.example .env   # then edit MONGO_URI and JWT_SECRET
npm run dev            # or: npm start
```
Generate a secret: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`

## API
All responses are JSON with `success: true|false`. Protected routes need an `auth-token` header.

| Method | Route | Auth | Body |
|---|---|---|---|
| POST | /api/auth/createuser | no | name, email, password |
| POST | /api/auth/login | no | email, password |
| POST | /api/auth/getuser | yes | - |
| GET | /api/notes/fetchallnotes?search=term | yes | - |
| POST | /api/notes/addnote | yes | title, description, tag? |
| PUT | /api/notes/updatenote/:id | yes | title?, description?, tag? |
| DELETE | /api/notes/deletenote/:id | yes | - |
