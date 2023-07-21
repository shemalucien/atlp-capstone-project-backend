import { string } from 'joi';
import mongoose from 'mongoose';

const ProjectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date()
  },}
);

const Project = mongoose.model('Project', ProjectSchema);
export default Project;
