import express from 'express';
import { subscribe, unsubscribe, getAllSubscribers } from '../controllers/subscribers.controller';
import { checkAuth, checkAdminAuth } from '../middleware/check-users';
const router = express.Router();
router.post('/subscribe', subscribe);
router.delete('/unsubscribe/:id', checkAdminAuth, unsubscribe);
router.get('/', getAllSubscribers);
export default router;