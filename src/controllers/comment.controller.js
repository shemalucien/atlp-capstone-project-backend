import Comment from "../database/model/comment.model";
import Blog from "../database/model/blog.model";
import { commentsValidation } from '../helpers/validation_schema';

export const saveComment = async (req, res) => {
    const { error } = commentsValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    const blogId = req.params.id;
    const newComment = new Comment({
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        blog: blogId,
    });
    const blog = await Blog.findById(blogId);
    blog.comments.push(newComment);
    await blog.save(function (error) {
        res.status(201).json({ status: "success", data: newComment });
    });
}

export const getAllComments = async (req, res) => {
    const comments = await Comment.find();
    res.status(200).json({ success: true, data: comments })
}



export const deleteCommentById = async (req, res) => {
    const { } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Comment deleted", data: null });
}
export const deleteAllComments = async (req, res) => {

    const title = await Blog.findOne(Blog.title);
    const comment = await Comment.deleteMany({ 'title': title });
    if (!comment) return res.status(404).json({ success: false, message: "Comments not found" });

    res.status(200).json({ success: true, message: "Comments deleted", data: null });
}

