import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";


// Generate OTP
// const generateOTP = () => {
//     return Math.floor(
//         100000 + Math.random() * 900000
//     ).toString();
// };



// ================= SIGNUP + SEND OTP =================
export const signup = async (req, res) => {
    try {

        const {
            fullname,
            mobilenumber,
            password,
            location,
            gender,
            dob
        } = req.body;

        console.log(req.body);

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

        // if (
        //     !fullname ||
        //     !mobilenumber ||
        //     !password ||
        //     !location ||
        //     !gender ||
        //     !dob
        // ) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "All fields required",
        //     });
        // }

        // Check existing user
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

        // OTP
        // const otp = generateOTP();

        // const otpExpiry =
        //     Date.now() + 5 * 60 * 1000;

        // Profile Photo URL
        // let profilePhoto = "";

        // if (req.file) {
        //     // Cloudinary URL here
        //     profilePhoto = req.file.path;
        // }

        // Create / Update user
        if (!user) {
            user = await User.create({
                fullname,
                mobilenumber,
                password: hashedPassword,
                location,
                gender,
                dob,
                // profilePhoto,
                // otp,
                // otpExpiry,
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

        // else {
        //     user.otp = otp;
        //     user.otpExpiry = otpExpiry;
        //     await user.save();
        // }

        // TODO:
        // Send OTP via Twilio / MSG91
        // console.log("OTP:", otp);

        // res.status(200).json({
        //     success: true,
        //     message:
        //         "OTP sent to mobile number",
        // });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// ================= VERIFY OTP =================
// export const verifyOTP = async (
//     req,
//     res
// ) => {
//     try {

//         const {
//             mobilenumber,
//             otp
//         } = req.body;

//         if (
//             !mobilenumber ||
//             !otp
//         ) {
//             return res.status(400).json({
//                 success: false,
//                 message:
//                     "Mobile and OTP required",
//             });
//         }

//         const user =
//             await User.findOne({
//                 mobilenumber
//             });

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message:
//                     "User not found",
//             });
//         }

//         // OTP check
//         if (
//             user.otp !== otp ||
//             user.otpExpiry < Date.now()
//         ) {
//             return res.status(400).json({
//                 success: false,
//                 message:
//                     "Invalid or expired OTP",
//             });
//         }

//         // Verified
//         user.isVerified = true;
//         user.otp = null;
//         user.otpExpiry = null;

//         await user.save();

//         // JWT
//         const token = jwt.sign(
//             {
//                 id: user._id,
//             },
//             process.env.JWT_SECRET,
//             {
//                 expiresIn: "7d",
//             }
//         );

//         res
//             .cookie(
//                 "token",
//                 token,
//                 {
//                     httpOnly: true,
//                     secure: false,
//                     sameSite:
//                         "strict",
//                     maxAge:
//                         7 *
//                         24 *
//                         60 *
//                         60 *
//                         1000,
//                 }
//             )
//             .status(200)
//             .json({
//                 success: true,
//                 message:
//                     "OTP verified successfully",
//                 token,
//                 user: {
//                     id: user._id,
//                     fullname:
//                         user.fullname,
//                     mobilenumber:
//                         user.mobilenumber,
//                     profilePhoto:
//                         user.profilePhoto,
//                 },
//             });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };



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
                sameSite: "strict",
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
export const logout = async (
    req,
    res
) => {

    res
        .clearCookie("token")
        .status(200)
        .json({
            success: true,
            message:
                "Logout successful",
        });
};