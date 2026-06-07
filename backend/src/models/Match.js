import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
    {
        matchNumber: {
            type: String,
            default: "",
        },

        // tournament: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Tournament",
        //     default: null,
        // },

        teamA: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true,
        },

        teamB: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true,
        },

        teamAPlayingXI: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Player",
            },
        ],

        teamBPlayingXI: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Player",
            },
        ],

        teamASubstitutes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Player",
            },
        ],

        teamBSubstitutes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Player",
            },
        ],

        teamACaptain: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        },

        teamBCaptain: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        },

        teamAWicketKeeper: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        },

        teamBWicketKeeper: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
        },

        overs: {
            type: Number,
            required: true,
        },

        // ballsPerOver: {
        //     type: Number,
        //     default: 6,
        // },

        // matchType: {
        //     type: String,
        //     enum: ["T5", "T10", "T20", "ODI", "Test", "Custom"],
        //     default: "T20",
        // },

        ballType: {
            type: String,
            enum: ["Leather", "Tennis", "Other"],
            default: "Leather",
        },

        pitchType: {
            type: String,
            enum: ["Matting", "Turf", "Concrete", "Other"],
            default: "Turf",
        },

        venue: {
            type: String,
            default: "",
        },

        city: {
            type: String,
            default: "",
        },

        startTime: Date,

        endTime: Date,

        tossWinner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
        },

        tossDecision: {
            type: String,
            enum: ["Bat", "Bowl"],
        },

        currentInnings: {
            type: Number,
            default: 1,
        },

        status: {
            type: String,
            enum: [
                "Upcoming",
                "Toss Pending",
                "Live",
                "Innings Break",
                "Completed",
                "Abandoned",
                "Cancelled"
            ],
            default: "Upcoming",
        },

        scorer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        umpires: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        commentators: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            default: null,
        },

        wonBy: {
            type: String,
            default: "",
        },

        result: {
            type: String,
            default: "",
        },

        playerOfTheMatch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            default: null,
        },

        highlights: [
            {
                title: String,
                description: String,
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],

        notes: {
            type: String,
            default: "",
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

export default mongoose.model("Match", matchSchema);