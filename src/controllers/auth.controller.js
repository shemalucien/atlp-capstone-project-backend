import User from '../database/model/user.model';
import { hash, verify } from '../helpers/hash-password';
import { decodeToken, signToken } from '../helpers/jwt';
// const { authSchema } = require('../helpers/validation_schema');

export const signup = async (req, res) => {
    let user = req.body;
    // const result = await authSchema.validateAsync(req.body)
    user.password = await hash(user.password);
    const oldUser = await User.findOne(User.email);
    if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
    }
    if (!result) {
        return res.status(409).send("Invalid email");
    }

    const newUser = await new User(user);
    newUser.save();
    res.status(201).json({ success: true, message: 'User created', data: newUser });
}

export const login = async (req, res) => {
    const { password, email } = req.body;

    // Validate if user exist in our database
    let user = await User.findOne({ email });
    // Validate user input
    if (!(email && password)) {
        res.status(400).send("All input is required");
    }
    if (!user) return res.status(401).json({ success: false, message: "Invalid email or password" });
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const { _id, firstName, lastName } = user;
    const token = signToken(JSON.stringify({ _id, firstName, lastName, email: user.email }));
    return res.status(200).json({ success: true, message: "successfully logged in", token })
}

export const userProfile = (req, res) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    const payload = decodeToken(token);
    return res.status(200).json({ success: true, data: payload });
}