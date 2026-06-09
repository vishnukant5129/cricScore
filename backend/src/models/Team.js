import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        shortName: {
            type: String,
            trim: true,
            uppercase: true,
        },

        // logo: {
        //     type: String,
        //     default: "",
        // },

        // description: {
        //     type: String,
        //     default: "",
        // },

        captain: 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Player",
                required: true,
            },
        

        viceCaptain: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Player",
            },
        ],

        wicketKeeper: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Player",
            },
        ],

        players: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Player",
                required: true,
            },
        ],

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        location: {
            type: String,
            default: "",
            required: true,
        },

        matchesPlayed: {
            type: Number,
            default: 0,
        },

        matchesWon: {
            type: Number,
            default: 0,
        },

        matchesLost: {
            type: Number,
            default: 0,
        },

        matchesDraw: {
            type: Number,
            default: 0,
        },

        totalRuns: {
            type: Number,
            default: 0,
        },

        totalWickets: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Team", teamSchema);