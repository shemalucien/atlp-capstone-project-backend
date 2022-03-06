import express from 'express';
import { deleteQueryById, getAllQueries, getById, saveQuery, updateQuery } from '../controllers/query.controller';

const router = express.Router();

router.post('/', saveQuery);
router.get('/', getAllQueries);
router.get('/:id', getById);
router.put('/:id', updateQuery);
router.delete('/:id', deleteQueryById);

export default router;