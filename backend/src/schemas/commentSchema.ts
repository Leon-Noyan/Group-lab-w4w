import { z } from 'zod'

export const commentSchema = z.object({
  content: z.string().min(1, 'Content cannot be empty').max(500),
})

export type CreateComment = z.infer<typeof commentSchema>
