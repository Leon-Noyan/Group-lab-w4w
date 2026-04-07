import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import commentRoute from './routes/comment.route.js'
import { connectDB } from './db.js'
import songRoutes from './routes/songroute.js'
import lyricRoute from './routes/lyric.route.js'
import userRoute from './routes/user.route.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

if (!process.env.VERCEL) {
  const dotenv = await import("dotenv");
  dotenv.config();
}

const app = express()

app.use(cors({
  origin: 'https://group-lab-w4w-web.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json())
// app.use(express.static(path.join(__dirname, '../../frontend/public')))

app.get('/', (req, res) => {
    res.json({ message: 'API is working 🚀' });
});

connectDB().catch(err => console.error("Database connection error:", err));

app.use('/api/comments', commentRoute) // Går till MongoDB
app.use('/api/songs', songRoutes) // Går till MySQL
app.use('/api/lyrics', lyricRoute) // Går till MySQL
app.use('/api/auth', userRoute) // Går till MySQL

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

const PORT = process.env.PORT || 3000

export default app;

