import { Router } from 'express';
import { getSongs, getSearchedSongs ,createSong, updateSong, deleteSong, createSongView } from '../controllers/songcontroller.js';


const router = Router();

router.get('/', getSongs);
router.get('/search', getSearchedSongs);
router.post('/', createSong);
router.post('/:id/views', createSongView);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);


export default router;
