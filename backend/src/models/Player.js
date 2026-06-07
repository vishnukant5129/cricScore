import mongoose from "mongoose";

import {
    battingStatsSchema,
    bowlingStatsSchema,
    fieldingStatsSchema
} from "./state.js"

const playerSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: [
                "batsman",
                "bowler",
                "allrounder",
                "wicketkeeper",
                "wicketkeeper-batsman",
            ],
            required: true,
        },

        battingStyle: {
            type: String,
            enum: ["right-hand", "left-hand"],
        },

        bowlingStyle: {
            type: String,
            enum: [
                "right-arm-fast",
                "right-arm-medium",
                "right-arm-spin",
                "left-arm-fast",
                "left-arm-medium",
                "left-arm-spin",
                "none",
            ],
            default: "none",
        },

        teams: [
            {
                type: [String],
                default: []
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

        createdBy: {

            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

    },
    {
        timestamps: true

    }
);

const Player = mongoose.model("Player", playerSchema);

export default Player;

