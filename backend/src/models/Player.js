import mongoose from "mongoose";
import {
    battingStatsSchema,
    bowlingStatsSchema,
    fieldingStatsSchema,
} from "./state.js";

const playerSchema = new mongoose.Schema(
    {
        // One User -> One Player Profile
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        role: {
            type: String,
            enum: [
                "Batsman",
                "Bowler",
                "All-Rounder",
                "Wicket Keeper",
            ],
            required: true,
        },

        battingStyle: {
            type: String,
            enum: [
                "Right Hand Bat",
                "Left Hand Bat",
            ],
            required: true,
        },

        bowlingStyle: {
            type: String,
            enum: [
                "Right Arm Fast",
                "Right Arm Medium",
                "Right Arm Off Spin",
                "Right Arm Leg Spin",
                "Left Arm Fast",
                "Left Arm Medium",
                "Left Arm Orthodox",
                "Left Arm Chinaman",
                "None",
            ],
            default: "None",
        },

        jerseyNumber: {
            type: Number,
            min: 0,
            max: 999,
        },

        dateOfBirth: {
            type: Date,
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
        },

        profileImage: {
            type: String,
            default: "",
        },

        bio: {
            type: String,
            default: "",
            trim: true,
        },

        teams: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Team",
            },
        ],

        careerStats: {
            batting: {
                type: battingStatsSchema,
                default: () => ({}),
            },

            bowling: {
                type: bowlingStatsSchema,
                default: () => ({}),
            },

            fielding: {
                type: fieldingStatsSchema,
                default: () => ({}),
            },
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
playerSchema.index({ role: 1 });
playerSchema.index({ teams: 1 });

const Player = mongoose.model("Player", playerSchema);

export default Player;