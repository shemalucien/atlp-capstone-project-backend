import express from 'express';
import multer from "multer";
import { deleteBlogById, getAllBlogs, getById, saveBlog, updateBlog } from '../controllers/blog.controller';
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

router.post('/', checkAdminAuth, uploads.single("photo"), saveBlog);
router.get('/', getAllBlogs);
router.get('/:id',getById);
router.delete('/:id', checkAdminAuth, deleteBlogById);
router.put('/:id', checkAdminAuth, updateBlog);

export default router;