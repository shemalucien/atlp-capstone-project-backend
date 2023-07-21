import express from 'express';
import { deleteQueryById, getAllQueries, getById, saveQuery, updateQuery } from '../controllers/query.controller';
import { checkAdminAuth, checkAuth } from '../middleware/check-users';
const router = express.Router();
router.post('/', saveQuery);
router.get('/', getAllQueries);
router.get('/:id', checkAdminAuth, getById);
router.put('/:id', checkAdminAuth, updateQuery);
router.delete('/:id', checkAdminAuth, deleteQueryById);


export default router;