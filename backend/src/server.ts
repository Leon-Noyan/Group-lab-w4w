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

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../../frontend/public')))

app.use('/api/comments', commentRoute) // Går till MongoDB
app.use('/api/songs', songRoutes) // Går till MySQL
app.use('/api/lyrics', lyricRoute) // Går till MySQL
app.use('/api/auth', userRoute) // Går till MySQL

const PORT = process.env.PORT || 3000

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(
                `Server is running on port ${PORT} with BOTH databases!`
            )
        })
    })
    .catch((error) => {
        console.error(
            'Could not start the server, server failed to start',
            error
        )
    })
