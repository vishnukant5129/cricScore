import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const getProfile = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        // console.log(authHeader)
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No token found, authorization denied"
            });
        }

        const token = authHeader.split(" ")[1];

        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET); 
        } catch (err) {
            return res.status(403).json({
                success: false,
                message: "Invalid or Expired Token"
            });
        }

        const id = decoded.id;

        const user = await User.findById(id).select(
            "fullname mobilenumber dob location profilePhoto"
        );

        res.status(200).json({
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