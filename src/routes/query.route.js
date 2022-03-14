import express from 'express';
import { deleteQueryById, getAllQueries, getById, saveQuery, updateQuery } from '../controllers/query.controller';
import { checkAdminAuth, checkAuth } from '../middleware/check-users';
const router = express.Router();

router.post('/', saveQuery);
router.get('/', checkAuth, getAllQueries);
router.get('/:id', getById);
router.put('/:id', checkAuth, updateQuery);
router.delete('/:id', checkAuth, deleteQueryById);

export default router;