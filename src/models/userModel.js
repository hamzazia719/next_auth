import mongoose from "mongoose";
import { types } from "util";


const userSehema = new mongoose.Schema({
    username: {
        types: String,
        required: [true, "Please enter the username"],
        unique: true
    },
    email: {
        types: String,
        required: [true, "Please enter the email"],
        unique: true
    },
    password: {
        types: String,
        required: [true, "Please enter the email"],
    },
    isVerified: {
        types: Boolean,
        default: false
    },
    isAdmin: {
        types: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry:Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const user = mongoose.models.users || mongoose.model("users", userSehema)

export default user