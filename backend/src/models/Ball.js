import mongoose from "mongoose";

const ballSchema = new mongoose.Schema(
    {
        match: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Match",
            required: true,
        },

        innings: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Innings",
            required: true,
        },

        over: {
            type: Number,
            required: true,
        },

        ball: {
            type: Number,
            required: true,
            min: 1,
            max: 6,
        },

        batsman: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            required: true,
        },

        nonStriker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            required: true,
        },

        bowler: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            required: true,
        },

        runs: {
            type: Number,
            default: 0,
        },

        extra: {
            extraType: {
                type: String,
                enum: ["none", "wide", "no-ball", "bye", "leg-bye"],
                default: "none",
            },

            runs: {
                type: Number,
                default: 0,
            },
        },

        wicket: {
            isWicket: {
                type: Boolean,
                default: false,
            },

            wicketType: {
                type: String,
                enum: [
                    "bowled",
                    "caught",
                    "lbw",
                    "run-out",
                    "stumped",
                    "hit-wicket",
                    "retired-hurt",
                    "obstructing-field",
                    "handled-ball",
                    "timed-out",
                ],
                default: null,
            },

            playerOut: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Player",
                default: null,
            },

            fielder: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Player",
                default: null,
            },
        },

        commentary: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Ball = mongoose.model("Ball", ballSchema);

export default Ball;


// _id
// match
// innings
// over
// ball
// batsman
// bowler
// runs
// extra
// wicket
// timestamp