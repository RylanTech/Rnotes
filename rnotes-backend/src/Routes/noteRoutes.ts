import { Router } from 'express';
import { createNote, getAllUserNotes, getNote, saveNote } from '../Controllers/noteController';

const router = Router();

router.post('/create', createNote)
router.get('/get/:id', getNote);
router.get('/get', getAllUserNotes);
router.put('/save/:id', saveNote)

export default router;