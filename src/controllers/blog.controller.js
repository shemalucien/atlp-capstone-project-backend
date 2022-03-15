import Blog from '../database/model/blog.model';
import { blogValidation } from '../helpers/validation_schema';
import { fileUpload } from "../helpers/multer";
export const saveBlog = async (req, res) => {
    const { error } = blogValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    if (req.file) {
        req.body.photo = await fileUpload(req);
    } else {
        req.body.photo =
            "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
    }
    const blog = {
        title: req.body.title,
        desc: req.body.desc,
        photo: req.body.photo,
        author: req.body.author,
    };

    const newBlog = new Blog(blog);
    await newBlog.save();
    res.status(201).json({ success: true, data: newBlog });
}


export const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find();
    res.status(200).json({ success: true, data: blogs })
}
export const getById = async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.status(200).json({ success: true, data: blog });
}

export const updateBlog = async (req, res) => {
   
    const { id } = req.params;
    const updates = req.body;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    await Blog.findByIdAndUpdate(id, updates);
    res.status(200).json({ success: true, message: "Blog updated successfully" })
}

export const deleteBlogById = async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Blog deleted", data: blog });
}

