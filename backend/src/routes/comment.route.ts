import { Router } from 'express'
import { createCommentController } from '../controllers/comment.controller.js'
import { getAllCommentsController } from '../controllers/comment.controller.js'
import { getCommentByIdController } from '../controllers/comment.controller.js'
import { updateCommentController } from '../controllers/comment.controller.js'
import { deleteCommentController } from '../controllers/comment.controller.js'

const router = Router()

router.post('/', createCommentController)
router.get('/', getAllCommentsController)
router.get('/:id', getCommentByIdController)
router.put('/:id', updateCommentController)
router.delete('/:id', deleteCommentController)

export default router
