"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = require("../models/users.model"); // adjust path as needed
const verifyAdmin = async (req, res, next) => {
    const decodedUser = req.decoded;
    if (!decodedUser?.email) {
        return res.status(401).send({ message: 'unauthorized access!!' });
    }
    const user = await users_model_1.User.findOne({ email: decodedUser.email });
    if (!user || user.role !== 'admin') {
        return res.status(403).send({ message: 'forbidden: not an admin' });
    }
    next();
};
exports.default = verifyAdmin;
