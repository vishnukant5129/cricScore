import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        mobilenumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "Other"],
        },

        dob: {
            type: Date,
            required: true,
        },

        profilePhoto: {
            type: String, // image URL
            default: "",
        },


        isVerified: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;