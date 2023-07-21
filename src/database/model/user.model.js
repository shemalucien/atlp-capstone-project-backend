import mongoose from 'mongoose';
import {isEmail} from 'validator';
const UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter Name']
    },
    email: {
        type: String,
        required: [true, 'Please enter Email'],
        unique: true,
        lowercase: true,
        validate: [isEmail,'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Minimum length of password must be at least 6 characters']
    }
})

const User = mongoose.model('User', UserSchema);
export default User;
