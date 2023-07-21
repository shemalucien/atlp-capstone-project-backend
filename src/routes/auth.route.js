import express from 'express';
import { login, signup, userProfile, getAllUsers, updateUserProfile, changePassword, deleteUser, logout } from '../controllers/auth.controller';
import { checkAdminAuth } from '../middleware/check-users';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user-profile', checkAdminAuth, userProfile);
router.get('/allUsers',getAllUsers);
router.put('/updateUserProfile', updateUserProfile);
router.put('/changePassword', changePassword);
router.delete('/deleteUser/:id', deleteUser)
router.post('/logout', logout);


export default router;