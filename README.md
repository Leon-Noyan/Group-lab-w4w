# Word 4 Word (Grupp-7-labb)

> A full-stack web application for managing and exploring song lyrics, artists, albums, and user comments. Built with TypeScript, Express, MySQL (Aiven), MongoDB, and a modern HTML/CSS/JS frontend. Deployed on Vercel.

---

## Live Demo

- Access the project here: [https://group-lab-w4w-web.vercel.app/](https://group-lab-w4w-web.vercel.app/)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Local Setup](#local-setup)
- [Deployment](#deployment)
- [API Overview](#api-overview)
- [Technologies Used](#technologies-used)

---

## Project Overview

This project is a lyrics and music management platform. Users can browse songs, view lyrics, register/login, and leave comments. The backend uses Express with TypeScript, MySQL (via Aiven), and MongoDB for comments. The frontend is a responsive HTML/CSS/JS app.

## Features

- User registration and authentication (JWT)
- Browse, search, and view songs, albums, and artists
- View and add lyrics for songs
- Comment system (MongoDB)
- Daily random lyric feature
- Responsive frontend with Bootstrap

## Project Structure

```
backend/
  src/
    controllers/   # Route controllers (comments, lyrics, songs, users)
    middleweare/   # Route security (JWT)
    models/        # Mongoose models
    routes/        # Express routes
    schemas/       # Zod validation schemas
    services/      # Business logic (MySQL/MongoDB)
    db.ts          # MongoDB connection
    mysql_db.ts    # MySQL (Aiven) connection
    server.ts      # Express app entrypoint
  database_setup.sql # MySQL schema
frontend/
  public/
    *.html, *.js, *.css  # Static frontend files
```

## Local Setup

> Most users do not need to install anything—just use the [Live Demo](https://group-lab-w4w-web.vercel.app/).

If you want to run the project locally:

### Prerequisites

- Node.js & npm
- MySQL database (Aiven recommended)
- MongoDB Atlas

### Backend

1. Clone your forked repo.
2. `cd backend`
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file with your credentials (see previous version for details).
5. Run the SQL in `database_setup.sql` on your Aiven MySQL instance.
6. Start the backend:
    ```bash
    npm run dev
    ```

### Frontend

1. Open `frontend/public/index.html` in your browser (or deploy as static site).

## Deployment

- **Backend:** Deployed on Vercel (see your forked repo for deployment config).
- **Database:** Uses Aiven for MySQL and MongoDB Atlas for comments.
- **Frontend:** Served as static files (can be deployed on Vercel or similar).

## API Overview

- `POST /api/auth/register` – Register user
- `POST /api/auth/login` – Login user
- `GET /api/songs` – List popular songs
- `GET /api/songs/all` – List all songs
- `GET /api/songs/search?search=...` – Search songs
- `POST /api/songs` – Add song
- `GET /api/lyrics/:id` – Get lyrics for song
- `GET /api/lyrics/random` – Get daily random lyric
- `POST /api/lyrics` – Add lyric
- `GET /api/comments` – List all comments
- `POST /api/comments` – Add comment (auth required)

## Technologies Used

- TypeScript, Node.js, Express
- MySQL (Aiven), MongoDB Atlas
- Zod (validation), JWT (auth)
- Bootstrap, HTML, CSS, JavaScript
- Vercel (deployment)

---

## Credits

Developed by Group 7 for a school project. See your forked GitHub repo for contributors and further changes.
