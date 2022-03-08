import express from 'express';
import { subscribe, unsubscribe, getAllSubscribers } from '../controllers/subscribers.controller';

const router = express.Router();
router.post('/subscribe', subscribe);
router.delete('/unsubscribe', unsubscribe);
router.get('/', getAllSubscribers);
export default router;