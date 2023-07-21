import { string } from 'joi';
import mongoose from 'mongoose';

const ExperienceSchema = mongoose.Schema({
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

const Experience = mongoose.model('Experience', ExperienceSchema);
export default Experience;
