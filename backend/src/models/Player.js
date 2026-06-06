const mongoose = require("mongoose");


const battingStatsSchema = new mongoose.Schema(
    {
        matches: { type: Number, default: 0 },
        innings: { type: Number, default: 0 },
        runs: { type: Number, default: 0 },
        ballsFaced: { type: Number, default: 0 },
        highScore: { type: Number, default: 0 },
        average: { type: Number, default: 0 },
        strikeRate: { type: Number, default: 0 },
        fifties: { type: Number, default: 0 },
        hundreds: { type: Number, default: 0 },
        fours: { type: Number, default: 0 },
        sixes: { type: Number, default: 0 },
        notOuts: { type: Number, default: 0 },
        ducks: { type: Number, default: 0 },
    },
    { _id: false }
);


const bowlingStatsSchema = new mongoose.Schema(
    {
        matches: { type: Number, default: 0 },
        innings: { type: Number, default: 0 },
        overs: { type: Number, default: 0 },
        balls: { type: Number, default: 0 },
        runs: { type: Number, default: 0 },
        wickets: { type: Number, default: 0 },
        economy: { type: Number, default: 0 },
        average: { type: Number, default: 0 },
        strikeRate: { type: Number, default: 0 },

        bestFigures: {
            wickets: { type: Number, default: 0 },
            runs: { type: Number, default: 0 },
        },

        fiveWickets: { type: Number, default: 0 },
        maidens: { type: Number, default: 0 },
    },
    { _id: false }
);


const fieldingStatsSchema = new mongoose.Schema(
    {
        catches: { type: Number, default: 0 },
        stumpings: { type: Number, default: 0 },
        runOuts: { type: Number, default: 0 },
    },
    { _id: false }
);

const playerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        dateOfBirth: {
            type: Date,
        },

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
                type: mongoose.Schema.Types.ObjectId,
                ref: "Team",
            },
        ],

        photo: {
            type: String,
            default: "",
        },

        jerseyNumber: {
            type: Number,
        },

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
        },
    },
    { timestamps: true }
);


playerSchema.index({ name: "text" });


module.exports = mongoose.model("Player", playerSchema);