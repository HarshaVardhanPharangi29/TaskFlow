# Scalable Web App (Auth + Dashboard + Tasks)

Full-stack project with React (Vite) frontend and Express/MongoDB backend implementing JWT auth, profile management, and Tasks CRUD with search/filter.

## Tech Stack
- Frontend: React 19, Vite, React Router 7, TailwindCSS, Axios, Zod
- Backend: Node.js, Express 5, MongoDB (Mongoose), JWT, bcryptjs, express-validator, CORS

## Features
- Signup/Login (JWT)
- Protected routes (Dashboard, Profile, Tasks)
- Profile fetch/update
- Tasks CRUD with search and status filter
- Client-side validation (Zod) + server-side validation (express-validator)

## Project Structure
- client/ — React app (Vite)
- server/ — Express API server

## Prerequisites
- Node.js 18+
- MongoDB URI (Atlas or local)

## Environment Variables
Create these files from the provided examples:
- server/.env
  - PORT=5000
  - MONGODB_URI=<your Mongo URI>
  - JWT_SECRET=<strong secret>
- client/.env (optional)
  - VITE_API_URL=http://localhost:5000/api

IMPORTANT: Do not commit real secrets. Only commit .env.example files.

## Install & Run
### Backend
```
cd server
npm install
npm run dev   # starts http://localhost:5000
```

### Frontend
```
cd client
npm install
npm run dev   # Vite dev server (prints URL, e.g. http://localhost:5173)
```

### Root convenience scripts (optional)
You can run from the repo root using npm prefix scripts:
```
npm run server:dev
npm run client:dev
```

## API Overview
Base URL: http://localhost:5000/api

- POST /auth/signup  { name, email, password }
- POST /auth/login   { email, password }
- GET  /profile      (Bearer token required)
- PUT  /profile      { name } (Bearer token)
- GET  /tasks        ?q=&status=todo|in-progress|done (Bearer)
- POST /tasks        { title, description?, status? } (Bearer)
- GET  /tasks/:id    (Bearer)
- PUT  /tasks/:id    { title?, description?, status? } (Bearer)
- DELETE /tasks/:id  (Bearer)

See Postman collection: ./Bajarangs_Frontend_Task.postman_collection.json
