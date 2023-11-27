import { Router } from 'express';
import { createNote, getAllUserNotes, getNote } from '../Controllers/noteController';

const router = Router();

router.post('/create', createNote)
router.get('/get/:id', getNote);
router.get('get', getAllUserNotes)

export default router;