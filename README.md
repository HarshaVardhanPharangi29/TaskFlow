# TaskFlow

Full‑stack task management app with authentication, profile, and task CRUD. Frontend is React (Vite). Backend is Express + MongoDB with JWT auth.

## Tech Stack
- Frontend: React 19, Vite, React Router 7, TailwindCSS, Axios, Zod
- Backend: Node.js, Express 5, MongoDB (Mongoose), JWT, bcryptjs, express-validator, CORS

## Features
- Email/password signup & login (JWT)
- Protected routes: Dashboard, Profile, Tasks
- Profile view/update
- Tasks CRUD with search and status filter
- Validation on client (Zod) and server (express-validator)

## Monorepo Structure
- client/ — React app (Vite)
- server/ — Express API server

## Requirements
- Node.js 18+
- MongoDB (Atlas or local)

## Environment
Create env files from examples and never commit real secrets.

- server/.env
  - PORT=5000
  - MONGODB_URI=your-mongodb-uri
  - JWT_SECRET=your-strong-secret
- client/.env (optional)
  - VITE_API_URL=http://localhost:5000/api

## Install & Run
### Backend
```
cd server
npm install
npm run dev  # http://localhost:5000
```

### Frontend
```
cd client
npm install
npm run dev  # shows URL, e.g. http://localhost:5173
```

### Root helper scripts
From repo root you can use:
```
npm run server:dev
npm run client:dev
```

## API Overview
Base URL: http://localhost:5000/api

- POST /auth/signup  { name, email, password }
- POST /auth/login   { email, password }
- GET  /profile      (Bearer)
- PUT  /profile      { name } (Bearer)
- GET  /tasks        ?q=&status=todo|in-progress|done (Bearer)
- POST /tasks        { title, description?, status? } (Bearer)
- GET  /tasks/:id    (Bearer)
- PUT  /tasks/:id    { title?, description?, status? } (Bearer)
- DELETE /tasks/:id  (Bearer)

Postman collection: ./TaskFlow.postman_collection.json
