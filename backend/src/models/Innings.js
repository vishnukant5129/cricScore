// _id
// match
// battingTeam
// bowlingTeam
// overs
// runs
// wickets
// balls

import mongoose from "mongoose";

const inningsSchema = new mongoose.Schema(
    {
        match: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Match",
            required: true,
        },

        inningsNumber: {
            type: Number,
            required: true,
            min: 1,
        },

        battingTeam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true,
        },

        bowlingTeam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true,
        },

        overs: {
            type: Number,
            default: 0,
        },

        balls: {
            type: Number,
            default: 0,
        },

        runs: {
            type: Number,
            default: 0,
        },

        wickets: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: ["Not Started", "Live", "Completed"],
            default: "Not Started",
        },
    },
    {
        timestamps: true,
    }
);

// One innings number per match
inningsSchema.index(
    { match: 1, inningsNumber: 1 },
    { unique: true }
);

const Innings = mongoose.model("Innings", inningsSchema);

export default Innings;