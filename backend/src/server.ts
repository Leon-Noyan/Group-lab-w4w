import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import commentRoute from './routes/comment.route.js'
import { connectDB } from './db.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
// app.use(express.static('public'))

app.use('/comments', commentRoute)

const PORT = process.env.PORT || 3000
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
