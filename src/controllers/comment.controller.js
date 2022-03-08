import Comment from "../database/model/comment.model";
 import { commentsValidation} from '../helpers/validation_schema';

export const saveComment = async (req, res) => {
    const { error } = commentsValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    const comment = req.body;
    const newComment = new Comment(comment);
    await newComment.save();
    res.status(201).json({ success: true, data: newComment });
}

export const getAllComments = async (req, res) => {
    const comments = await Comment.find();
    res.status(200).json({ success: true, data: comments })
}



export const deleteCommentById = async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Comment deleted", data: null });
}
