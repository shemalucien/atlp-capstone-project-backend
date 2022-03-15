import express from 'express';
import { deleteQueryById, getAllQueries, getById, saveQuery, updateQuery } from '../controllers/query.controller';
import { checkAdminAuth, checkAuth } from '../middleware/check-users';
const router = express.Router();
/**
 * @swagger
 *  tags:
 *    name: Posts
 *    description: posts of users
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - body
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a post
 *         userId:
 *           type: integer
 *           description: id of author
 *         title:
 *           type: string
 *           description: title of post
 *         body:
 *           type: string
 *           descripton: content of post *
 *       example:
 *         id: 1
 *         userId: 1
 *         title: my title
 *         body: my article
 *
 */

router.post('/', saveQuery);
router.get('/', getAllQueries);
router.get('/:id', getById);
router.put('/:id', updateQuery);
router.delete('/:id', deleteQueryById);

export default router;