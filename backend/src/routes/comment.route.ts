import { Router } from 'express'
import { createCommentController, getAllCommentsController, getCommentByIdController, updateCommentController, deleteCommentController, getCommentsBySongIdController } from '../controllers/comment.controller.js'
import { secureRoute } from '../middleweare/secureRoute.middleweare.js'

const router = Router()

router.post('/', secureRoute, createCommentController)
router.get('/', getAllCommentsController)
router.get('/song/:song_id', getCommentsBySongIdController)
router.get('/:id', getCommentByIdController)
router.put('/:id', secureRoute, updateCommentController)
router.delete('/:id', secureRoute, deleteCommentController)


export default router
