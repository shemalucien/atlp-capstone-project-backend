import Experience from '../database/model/experience.model';
import { experienceValidation } from '../helpers/validation_schema';
import { imageUpload } from "../helpers/multer";
export const saveExperience = async (req, res) => {
    try {
        const { error } = experienceValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let imageUrl = "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80";
        if (req.file) {
            imageUrl = await imageUpload(req);
            console.log(imageUrl);
        }

        const experience = new Experience({
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            image: imageUrl,
            link: req.body.link,
        });

        const newExperience = await experience.save();
        res.status(201).json({ success: true, data: newExperience });
    } catch (error) {
        console.error("Error saving experience:", error);
        res.status(500).json({ success: false, message: "An error occurred while saving the experience." });
    }
};

export const getAllExperiences = async (req, res) => {
    const experiences = await Experience.find();
    res.status(200).json({ success: true, data: experiences })
}
export const updateExperience = async (req, res) => {

    const { id } = req.params;
    const updates = req.body;
    const Experience = await Experience.findById(id);
    if (!Experience) return res.status(404).json({ success: false, message: "Experience not found" });
    await Experience.findByIdAndUpdate(id, updates);
    res.status(200).json({ success: true, message: "Experience updated successfully" })
}

export const deleteExperienceById = async (req, res) => {
    const { id } = req.params;
    const Experience = await Experience.findById(id);
    if (!Experience) return res.status(404).json({ success: false, message: "Experience not found" });
    await Experience.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Experience deleted", data: Experience });
}