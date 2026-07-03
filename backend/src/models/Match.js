import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
    {
        matchNumber: {
            type: String,
            trim: true,
            default: "",
        },

        tournament: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament",
            default: null,
        },

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

        ballsPerOver: {
            type: Number,
            default: 6,
        },

        matchType: {
            type: String,
            enum: ["Friendly", "Tournament", "Practice"],
            default: "Friendly",
        },

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

        ground: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ground",
            default: null,
        },

        venue: {
            type: String,
            trim: true,
            default: "",
        },

        city: {
            type: String,
            trim: true,
            default: "",
        },

        matchDate: {
            type: Date,
            required: true,
        },

        startTime: {
            type: Date,
        },

        endTime: {
            type: Date,
        },

        toss: {
            winner: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Team",
            },

            decision: {
                type: String,
                enum: ["Bat", "Bowl"],
            },
        },

        currentInnings: {
            type: Number,
            default: 1,
        },

        innings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Innings",
            },
        ],

        status: {
            type: String,
            enum: [
                "Upcoming",
                "Toss Pending",
                "Live",
                "Innings Break",
                "Completed",
                "Abandoned",
                "Cancelled",
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
                title: {
                    type: String,
                    trim: true,
                },

                description: {
                    type: String,
                    trim: true,
                },

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