import express from 'express';
import multer from "multer";
import {saveExperience,getAllExperiences,updateExperience,deleteExperienceById} from '../controllers/experience.controller';
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

router.post('/', uploads.single("image"), saveExperience);
router.get('/', getAllExperiences);
router.delete('/:id', deleteExperienceById);
router.put('/:id', updateExperience);
export default router;