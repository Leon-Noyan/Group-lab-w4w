import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import commentRoute from './routes/comment.route.js'
import { connectDB } from './db.js'
import songRoutes from './routes/songroute.js'
import lyricRoute from './routes/lyric.route.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/comments', commentRoute) // Går till MongoDB
app.use('/api/songs', songRoutes) // Går till MySQL
app.use('/api/lyrics', lyricRoute) // Går till MySQL

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
            'Kunde inte starta servern eftersom MongoDB misslyckades:',
            error
        )
    })
