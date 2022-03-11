import { string } from "joi";
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    blog: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;