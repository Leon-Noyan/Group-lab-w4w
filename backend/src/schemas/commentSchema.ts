import { z } from 'zod'

export const commentSchema = z.object({
    song_id: z.number(),
    user_id: z.number(),
    username: z.string().min(1, 'Username cannot be empty').max(150),
    content: z.string().min(1, 'Content cannot be empty').max(500)
})

export type CreateComment = z.infer<typeof commentSchema>
