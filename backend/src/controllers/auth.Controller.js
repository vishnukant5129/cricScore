import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

// ================= SIGNUP =================
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

        if (missingFields.length) {
            return res.status(400).json({
                success: false,
                message: "Missing fields",
                missingFields,
            });
        }

        const existingUser = await User.findOne({ mobilenumber });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Mobile already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullname,
            mobilenumber,
            password: hashedPassword,
            location,
            gender,
            dob,
            profilePhoto: profilePictureUrl,
            isVerified: true,
        });

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
                profilePhoto: user.profilePhoto,
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
        const { mobilenumber, password } = req.body;

        if (!mobilenumber || !password) {
            return res.status(400).json({
                success: false,
                message: "Mobile and password required",
            });
        }

        const user = await User.findOne({ mobilenumber });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Access Token
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m",
            }
        );

        // Refresh Token
        const refreshToken = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: "7d",
            }
        );

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 15 * 60 * 1000,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                mobilenumber: user.mobilenumber,
                profilePhoto: user.profilePhoto,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= REFRESH TOKEN =================
export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Refresh token missing",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET
        );

        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== token) {
            return res.status(403).json({
                success: false,
                message: "Invalid refresh token",
            });
        }

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m",
            }
        );

        res.cookie("token", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 15 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            token: accessToken,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res) => {
    try {
        const { mobilenumber, newPassword } = req.body;

        if (!mobilenumber || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Mobile number and new password required",
            });
        }

        const user = await User.findOne({ mobilenumber });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Old password and new password are required",
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        // Prevent same password
        const isSamePassword = await bcrypt.compare(newPassword, user.password);

        if (isSamePassword) {
            return res.status(400).json({
                success: false,
                message: "New password cannot be the same as the old password",
            });
        }

        // Hash new password
        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= VERIFY USER =================
export const verifyEmail = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.isVerified = true;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "User verified successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= GET PROFILE =================
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password -refreshToken");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user,
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
    try {
        const token = req.cookies.refreshToken;

        if (token) {
            const user = await User.findOne({ refreshToken: token });

            if (user) {
                user.refreshToken = "";
                await user.save();
            }
        }

        res.clearCookie("token");
        res.clearCookie("refreshToken");

        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};