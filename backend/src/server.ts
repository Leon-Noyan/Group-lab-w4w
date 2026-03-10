import express from 'express'
import type { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Comment } from './models/Comments.js'
import { commentSchema } from './schemas/commentSchema.js'
import { connectDB } from './db.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
// app.use(express.static('public'))

app.post('/comments', async (req: Request, res: Response) => {
    try {
        console.log('req.body', req.body)
        const comment = await Comment.create(req.body)
        res.status(201).json(comment)
    } catch (error) {
        console.log('error:', error)
        res.status(500).json({ message: 'Could not create comment' })
    }
})

app.get('/comments', async (req: Request, res: Response) => {
    try {
        const comments = await Comment.find()
        res.json(comments)
    } catch (error) {
        res.status(500).json({ message: 'Could not load comments' })
    }
})

const PORT = process.env.PORT || 3000
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
