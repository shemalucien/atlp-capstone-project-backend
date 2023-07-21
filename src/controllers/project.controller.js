import Project from '../database/model/project.model';
import { projectValidation } from '../helpers/validation_schema';
import { imageUpload } from "../helpers/multer";
export const saveProject = async (req, res) => {
    try {
        const { error } = projectValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let imageUrl = "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80";
        if (req.file) {
            imageUrl = await imageUpload(req);
            console.log(imageUrl);
        }

        const project = new Project({
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            image: imageUrl,
            link: req.body.link,
        });

        const newProject = await project.save();
        res.status(201).json({ success: true, data: newProject });
    } catch (error) {
        console.error("Error saving project:", error);
        res.status(500).json({ success: false, message: "An error occurred while saving the project." });
    }
};

export const getAllProjects = async (req, res) => {
    const Projects = await Project.find();
    res.status(200).json({ success: true, data: Projects })
}
export const updateProject = async (req, res) => {

    const { id } = req.params;
    const updates = req.body;
    const Project = await Project.findById(id);
    if (!Project) return res.status(404).json({ success: false, message: "Project not found" });
    await Project.findByIdAndUpdate(id, updates);
    res.status(200).json({ success: true, message: "Project updated successfully" })
}

export const deleteProjectById = async (req, res) => {
    const { id } = req.params;
    const Project = await Project.findById(id);
    if (!Project) return res.status(404).json({ success: false, message: "Project not found" });
    await Project.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Project deleted", data: Project });
}