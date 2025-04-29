import express from 'express';
import { signup, login, verifyToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify', verifyToken);

export default router;
