import express from 'express';

import { deleteCommentById, saveComment, getAllComments, deleteAllComments } from '../controllers/comment.controller';
import { checkAdminAuth, checkAuth } from '../middleware/check-users';
const router = express.Router();

router.post('/', checkAuth, saveComment);
router.get('/', checkAuth, getAllComments);
router.delete('/:id', checkAuth, deleteCommentById);
router.delete('/', deleteAllComments);

export default router;