import express from 'express';
import multer from "multer";
import {saveProject,getAllProjects,updateProject,deleteProjectById} from '../controllers/project.controller';
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

router.post('/', uploads.single("image"), saveProject);
router.get('/', getAllProjects);
router.delete('/:id', deleteProjectById);
router.put('/:id', updateProject);
export default router;