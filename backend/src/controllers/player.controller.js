import User from "../models/User.js";

export const getProfile = async (req, res) => {
    try {
        const id = req.user?.id || "6a1fee696a1801608c58b87d";
        const user = await User.findById(id).select(
            "fullname mobilenumber dob location"
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