import { string } from 'joi';
import mongoose from 'mongoose';

const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: new Date()
  },
  comments: [
    {
      name: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
      comment: {
        type: String,
        required: false
      }
    }
  ],

}
);

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;
