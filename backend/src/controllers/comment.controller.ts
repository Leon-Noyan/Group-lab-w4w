import type { Request, Response } from 'express'
import {
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment,
    getCommentsBySongId
} from '../services/comment.service.js'
import { commentSchema } from '../schemas/commentSchema.js'

// POST
export const createCommentController = async (req: Request, res: Response) => {
    try {
        const data = commentSchema.parse(req.body)
        const comment = await createComment(data)
        res.status(201).json(comment)
    } catch (error) {
        console.log('error:', error)
        res.status(500).json({ message: 'Could not create comment' })
    }
}
// GET All Comments
export const getAllCommentsController = async (req: Request, res: Response) => {
    try {
        const comments = await getAllComments()
        res.json(comments)
    } catch (error) {
        res.status(500).json({ message: 'Could not load comments' })
    }
}

// GET Comment by ID
export const getCommentByIdController = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        // kolla med alex kring denna lösning
        const { id } = req.params
        const comment = await getCommentById(id)
        if (!comment) {
            return res.status(404).json({ message: 'Could not find comment' })
        }
        res.json(comment)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

// GET Comment by songId

export const getCommentsBySongIdController = async (
    req: Request,
    res: Response
) => {
    try {
        const song_id = req.params.song_id as string
        if (!song_id) {
            return res.status(400).json({ message: 'Missing song id' })
        }

        const comments = await getCommentsBySongId(song_id)
        res.json(comments)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

// PUT/ UPDATE Comment
export const updateCommentController = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const { id } = req.params
        const updatedComment = await updateComment(id, req.body)
        if (!updatedComment) {
            return res.status(404).json({ message: 'Could not find comment' })
        }
        res.status(200).json(updatedComment)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

// Delete Comment
export const deleteCommentController = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const { id } = req.params
        const deletedComment = await deleteComment(id)
        if (!deletedComment) {
            return res.status(404).json({ message: 'Could not find comment' })
        }
        res.status(200).json(deletedComment)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}
