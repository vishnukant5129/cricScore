import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

// ================= SIGNUP + SEND OTP =================
export const signup = async (req, res) => {
    try {

        const {
            fullname,
            mobilenumber,
            password,
            location,
            gender,
            dob,
        } = req.body;

        let profilePictureUrl = "";

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            profilePictureUrl = result.secure_url;
        }

        const missingFields = [];

        if (!fullname) missingFields.push("fullname");
        if (!mobilenumber) missingFields.push("mobilenumber");
        if (!password) missingFields.push("password");
        if (!location) missingFields.push("location");
        if (!gender) missingFields.push("gender");
        if (!dob) missingFields.push("dob");

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Missing fields",
                missingFields,
            });
        }

        let user = await User.findOne({
            mobilenumber
        });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "Mobile already registered",
            });
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        if (!user) {
            user = await User.create({
                fullname,
                mobilenumber,
                password: hashedPassword,
                location,
                gender,
                dob,
                profilePhoto: profilePictureUrl,
                isVerified: true,
            });
        }
        return res.status(201).json({
            success: true,
            message: "Signup successful",
            user: {
                id: user._id,
                fullname: user.fullname,
                mobilenumber: user.mobilenumber,
                location: user.location,
                gender: user.gender,
                dob: user.dob,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= LOGIN =================
export const login = async (req, res) => {
    try {

        const {
            mobilenumber,
            password
        } = req.body;

        // validation
        if (!mobilenumber || !password) {
            return res.status(400).json({
                success: false,
                message: "Mobile and password required",
            });
        }

        // find user
        const user = await User.findOne({
            mobilenumber
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // password compare
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // JWT token
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge:
                    7 *
                    24 *
                    60 *
                    60 *
                    1000,
            })
            .status(200)
            .json({
                success: true,
                message: "Login successful",
                token,
                user: {
                    id: user._id,
                    fullname: user.fullname,
                    mobilenumber: user.mobilenumber,
                },
            });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// ================= LOGOUT =================
export const logout = async (req, res) => {
    res
        .clearCookie("token", {
            httpOnly: true,
            sameSite: 'lax',
            secure: false
        })
        .status(200)
        .json({
            success: true,
            message:
                "Logout successful",
        });
};

export default refreshToken = async (req, res) => {
};


export default forgotPassword = async (req, res) => {
};

export default verifyEmail = async (req, res) => {
};

export default getProfile = async (req, res) => {
};