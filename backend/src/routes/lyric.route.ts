import { Router } from 'express'
import * as lyricController from '../controllers/lyric.controller.js'

const router = Router()

router.get('/:id', lyricController.getLyricsBySong)
router.post('/', lyricController.postLyric)
router.put('/:id', lyricController.updateLyric)
router.delete('/:id', lyricController.deleteLyric)

export default router
