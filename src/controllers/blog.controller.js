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
            "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80";
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

export const commentonBlog = async (req, res) => {
    const id = (req.params.id)
    const comment = req.body;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ status: "fail", message: "blog not found" });
    blog.comments.push(comment);
    console.log(blog);
    await Blog.findByIdAndUpdate(id, comment);
    blog.save();
    res.status(201).json({ status: "success", message: "comment added" });
}
export const getAllComment = async (req, res) => {
    const id = (req.params.id)
    const blog = await Blog.findById(id);
    const comments = blog.comments;
    res.status(200).json({ status: "success", data: comments })
}

export const deleteComment = async (req, res) => {
    const id = req.params.id
    const commentId = req.params.commentId
    const blog = await Blog.findById(id);
    console.log(blog);
    const comments = blog.comments.filter(c => c.id !== commentId);
    blog.comments = comments
    blog.save()
    res.status(200).json({ status: "success", data: blog });
}