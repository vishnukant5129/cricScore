const tournamentSchema = new mongoose.Schema(
    {
        tournamentName: {
            type: String,
            required: true,
            trim: true,
        },

        shortName: {
            type: String,
            trim: true,
            uppercase: true,
        },

        description: {
            type: String,
            default: "",
        },

        logo: {
            type: String,
            default: "",
        },

        banner: {
            type: String,
            default: "",
        },

        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        teams: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Team",
            },
        ],

        matches: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Match",
            },
        ],

        format: {
            type: String,
            enum: [
                "League",
                "Knockout",
                "League + Knockout",
                "Round Robin",
            ],
            default: "League",
        },

        maxTeams: {
            type: Number,
            default: 16,
        },

        ballType: {
            type: String,
            enum: ["Leather", "Tennis", "Other"],
            default: "Leather",
        },

        pitchType: {
            type: String,
            enum: ["Turf", "Matting", "Concrete", "Other"],
            default: "Turf",
        },

        overs: {
            type: Number,
            required: true,
        },

        venue: {
            type: String,
            default: "",
        },

        city: {
            type: String,
            default: "",
        },

        state: {
            type: String,
            default: "",
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
        },

        registrationStartDate: Date,

        registrationEndDate: Date,

        registrationFee: {
            type: Number,
            default: 0,
        },

        prizePool: {
            type: Number,
            default: 0,
        },

        winnerPrize: {
            type: Number,
            default: 0,
        },

        runnerUpPrize: {
            type: Number,
            default: 0,
        },

        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            default: null,
        },

        runnerUp: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            default: null,
        },

        playerOfTournament: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            default: null,
        },

        highestRunScorer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            default: null,
        },

        highestWicketTaker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            default: null,
        },

        bestBatsman: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            default: null,
        },

        bestBowler: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            default: null,
        },

        status: {
            type: String,
            enum: [
                "Draft",
                "Registration Open",
                "Registration Closed",
                "Upcoming",
                "Ongoing",
                "Completed",
                "Cancelled",
            ],
            default: "Draft",
        },

        rules: [String],

        sponsors: [
            {
                name: String,
                logo: String,
                website: String,
            },
        ],

        officials: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        liveStreamingLink: {
            type: String,
            default: "",
        },

        isPublic: {
            type: Boolean,
            default: true,
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