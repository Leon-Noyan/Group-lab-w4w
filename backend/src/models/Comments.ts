import { Schema, model, type InferSchemaType } from 'mongoose'

const commentSchema = new Schema({
    song_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    username: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
})

export type IComment = InferSchemaType<typeof commentSchema>
export const Comment = model<IComment>('Comment', commentSchema)
