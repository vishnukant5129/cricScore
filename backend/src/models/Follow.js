// _id
// user
// team
// player
// tournament

import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            default: null,
        },

        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            default: null,
        },

        tournament: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate follows
// followSchema.index({ user: 1, team: 1 }, { unique: true, sparse: true });
// followSchema.index({ user: 1, player: 1 }, { unique: true, sparse: true });
// followSchema.index({ user: 1, tournament: 1 }, { unique: true, sparse: true });

const Follow = mongoose.model("Follow", followSchema);

export default Follow;