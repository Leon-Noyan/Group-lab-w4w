import { Comment } from '../models/Comments.js'
import type { CreateComment } from '../schemas/commentSchema.js'

// POST
export const createComment = async (data: CreateComment) => {
    const comment = await Comment.create(data)
    return comment
}
// GET All Comments
export const getAllComments = async () => {
    const comments = await Comment.find()
    return comments
}

// GET Comment by ID
export const getCommentById = async (id: string) => {
    const comment = await Comment.findById(id)
    return comment
}

// GET Comment by songId
export const getCommentsBySongId = async (id: string) => {
  const comments = await Comment.find({ song_id: parseInt(id) })
  return comments
}



// PUT
export const updateComment = async (
    id: string,
    data: Partial<CreateComment>
) => {
    return await Comment.findByIdAndUpdate(id, data, { returnDocument: 'after' })
}

export const deleteComment = async (id: string) => {
    const deletedComment = await Comment.findByIdAndDelete(id)
    return deletedComment
}
