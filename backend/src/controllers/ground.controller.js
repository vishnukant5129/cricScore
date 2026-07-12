import mongoose from "mongoose";
import Ground from "../models/ground.model.js";

export const createGround = async (req, res) => {
    try {
        const {
            name,
            city,
            state,
            country,
            latitude,
            longitude,
        } = req.body;

        if (
            !name ||
            !city ||
            !state ||
            !country ||
            latitude === undefined ||
            longitude === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingGround = await Ground.findOne({
            name: name.trim(),
            city: city.trim(),
        });

        if (existingGround) {
            return res.status(409).json({
                success: false,
                message: "Ground already exists",
            });
        }

        const ground = await Ground.create({
            name,
            city,
            state,
            country,
            latitude,
            longitude,
            createdBy: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Ground created successfully",
            ground,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getGrounds = async (req, res) => {
    try {
        const grounds = await Ground.find()
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: grounds.length,
            grounds,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getGroundById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Ground ID",
            });
        }

        const ground = await Ground.findById(id).populate(
            "createdBy",
            "name email"
        );

        if (!ground) {
            return res.status(404).json({
                success: false,
                message: "Ground not found",
            });
        }

        return res.status(200).json({
            success: true,
            ground,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateGround = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Ground ID",
            });
        }

        const ground = await Ground.findById(id);

        if (!ground) {
            return res.status(404).json({
                success: false,
                message: "Ground not found",
            });
        }

        if (ground.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const updatedGround = await Ground.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Ground updated successfully",
            ground: updatedGround,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Ground already exists",
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteGround = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Ground ID",
            });
        }

        const ground = await Ground.findById(id);

        if (!ground) {
            return res.status(404).json({
                success: false,
                message: "Ground not found",
            });
        }

        if (ground.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        await Ground.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Ground deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};