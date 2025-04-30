import express from 'express';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { updateWeightEntry, deleteWeightEntry, getWeightEntries, addWeightEntry } from '../controllers/weightEntryController.js';
const router = express.Router();

router.get('/history', authenticateUser, getWeightEntries);
router.post('/add', authenticateUser, addWeightEntry);
router.put('/update/:id', authenticateUser, updateWeightEntry);
router.delete('/delete/:id', authenticateUser, deleteWeightEntry);

export default router;