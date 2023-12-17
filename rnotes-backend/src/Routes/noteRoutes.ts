import { Router } from 'express';
import { createNote, deleteNote, getAllUserNotes, getNote, saveNote, searchNote } from '../Controllers/noteController';

const router = Router();

router.post('/create', createNote)
router.get('/get/:id', getNote);
router.get('/get', getAllUserNotes);
router.put('/save/:id', saveNote)
router.delete('/delete/:id', deleteNote)
router.get('/search/:query', searchNote)

export default router;