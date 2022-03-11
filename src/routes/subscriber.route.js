import express from 'express';
import { subscribe, unsubscribe, getAllSubscribers } from '../controllers/subscribers.controller';
import { checkAuth } from '../middleware/check-users';
const router = express.Router();
router.post('/subscribe', subscribe);
router.delete('/unsubscribe', unsubscribe);
router.get('/', checkAuth, getAllSubscribers);
export default router;