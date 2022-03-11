import express from 'express';
import { login, signup, userProfile, logout } from '../controllers/auth.controller';
import { checkAdminAuth } from '../middleware/check-users';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user-profile', userProfile);
router.get('/logout', logout);
export default router;