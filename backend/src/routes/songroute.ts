import { Router } from 'express';
import { getSongs, getSearchedSongs ,createSong, updateSong, deleteSong } from '../controllers/songcontroller.js';


const router = Router();

router.get('/', getSongs);
router.get('/search', getSearchedSongs);
router.post('/', createSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);


export default router;
