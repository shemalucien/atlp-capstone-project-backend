import express from 'express';
import multer from "multer";
import { deleteBlogById, getAllBlogs, getById, saveBlog, updateBlog, commentonBlog, getAllComment,deleteComment } from '../controllers/blog.controller';
import { checkAdminAuth } from '../middleware/check-users';
const router = express.Router();
const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("invalid image file!", false);
    }
};
const uploads = multer({ storage, fileFilter });

router.post('/', uploads.single("photo"), saveBlog);
router.get('/', getAllBlogs);
router.get('/:id', getById);
router.delete('/:id', checkAdminAuth, deleteBlogById);
router.put('/:id', checkAdminAuth, updateBlog);
router.put('/:id/comment', commentonBlog);
router.get('/:id/comments', getAllComment)
router.delete('/:id/comments/:commentId', deleteComment);
export default router;