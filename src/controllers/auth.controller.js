import { use } from 'chai';
import User from '../database/model/user.model';
import { hash, verify } from '../helpers/hash-password';
import { decodeToken, signToken } from '../helpers/jwt';
import { registerValidation } from '../helpers/validation_schema';


export const signup = async (req, res) => {
    let user = req.body;
    user.password = await hash(user.password);

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })

    let oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
        return res.status(400).json({ error: true, message: "You have already registered please Login" });
    }
    const newUser = await new User(user);
    newUser.save();
    res.status(201).json({ success: true, message: 'User created', data: newUser.email });
}

export const login = async (req, res) => {
    const { password, email } = req.body;
    let user = await User.findOne({ email });
    if (!(email && password)) {
        res.status(400).send("All input is required");
    }
    if (!user) return res.status(401).json({ success: false, message: "Invalid email or password" });
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const { _id, firstName, lastName, role } = user;
    const token = signToken(JSON.stringify({ _id, firstName, lastName, role, email: user.email }));
    return res.status(200).json({ success: true, message: "successfully logged in", token })
}

export const userProfile = (req, res) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    const payload = decodeToken(token);
    if (payload) {
        return res.status(200).json({ success: true, data: payload });
    }
    else {
        return res.status(401).json({ status: "fail", message: "Not Authorized" });
    }
}

export const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json({ success: true, data: users })
}
export const updateUserProfile = async (req, res) => {
    const user = await User.findOneAndUpdate({ email: req.body.email })
    if (!user) return res.status(404).json({ status: 404, message: "User not Found" });
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.password = req.body.password;
    user.email = req.body.email;
    user.save();
    res.status(200).json({ status: 200, message: "User Profile Updated Successfully", data: user });
}
export const changePassword = async (req, res) => {
    const user = await User.findOneAndUpdate({ email: req.body.email })
    if (!user) return res.status(404).json({ status: 404, message: "User not Found" });
    user.password = req.body.password;
    user.save();
    res.status(200).json({ status: 200, message: "User Password Updated Successfully", data: user });

}
export const deleteUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(404).json({ status: 404, message: "User not Found" });
    await User.findOneAndDelete(user)
    res.status(200).json({ success: true, message: "User deleted", data: null });
}
export const logout = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    const bearerToken = req.headers.authorization;

    if (bearerToken) {
        return res.status(400).json({ error: true, message: "You have already logged out" });
    }
    await User.findOneAndDelete(bearerToken);
    res.status(200).json({ success: true, message: "User Logged out Successfully", data: null });
}