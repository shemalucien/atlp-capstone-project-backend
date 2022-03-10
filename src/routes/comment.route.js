import express from 'express';

import { deleteCommentById, saveComment, getAllComments } from '../controllers/comment.controller';

const router = express.Router();

router.post('/', saveComment);
router.get('/', getAllComments);
router.delete('/:id', deleteCommentById);

export default router;