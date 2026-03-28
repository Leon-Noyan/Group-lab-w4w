import { Router } from 'express'
import { createCommentController } from '../controllers/comment.controller.js'
import { getAllCommentsController } from '../controllers/comment.controller.js'
import { getCommentByIdController } from '../controllers/comment.controller.js'
import { updateCommentController } from '../controllers/comment.controller.js'
import { deleteCommentController } from '../controllers/comment.controller.js'
import { getCommentsBySongIdController } from '../controllers/comment.controller.js'
import { secureRoute } from '../middleweare/secureRoute.middleweare.js'

const router = Router()
// kolla om jag kan skicka in allting med en linje av kod
router.post('/', secureRoute, createCommentController)
router.get('/', getAllCommentsController)
router.get('/song/:song_id', getCommentsBySongIdController)
router.get('/:id', getCommentByIdController)
router.put('/:id', secureRoute, updateCommentController)
router.delete('/:id', secureRoute, deleteCommentController)


export default router
