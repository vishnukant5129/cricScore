const mongoose = require("mongoose");


const battingStatsSchema = new mongoose.Schema(
    {
        matches: {
            type: Number,
            default: 0
        },
        innings: {
            type: Number,
            default: 0
        },
        runs: {
            type: Number,
            default: 0
        },
        ballsFaced: {
            type: Number,
            default: 0
        },
        highScore: {
            type: Number,
            default: 0
        },
        // average: {
        //     type: Number,
        //     default: 0
        // },
        // strikeRate: {
        //     type: Number,
        //     default: 0
        // },
        thirtes: {
            type: Number,
            default: 0
        },
        fifties: {
            type: Number,
            default: 0
        },
        hundreds: {
            type: Number,
            default: 0
        },
        fours: {
            type: Number,
            default: 0
        },
        sixes: {
            type: Number,
            default: 0
        },
        notOuts: {
            type: Number,
            default: 0
        },
        ducks: {
            type: Number,
            default: 0
        },
    },
    {
        _id: false

    }
);


const bowlingStatsSchema = new mongoose.Schema(
    {
        matches: {
            type: Number,
            default: 0
        },
        innings: {
            type: Number,
            default: 0
        },
        overs: {
            type: Number,
            default: 0
        },
        balls: {
            type: Number,
            default: 0
        },
        runs: {
            type: Number,
            default: 0
        },
        wickets: {
            type: Number,
            default: 0
        },
        // economy: {
        //     type: Number,
        //     default: 0
        // },
        // average: {
        //     type: Number,
        //     default: 0
        // },
        // strikeRate: {
        //     type: Number,
        //     default: 0
        // },

        bestBowling: {
            wickets: {
                type: Number,
                default: 0
            },
            runs: {
                type: Number,
                default: 0
            },

        },
        threeWickets: {
            type: Number,
            default: 0
        },
        fiveWickets: {
            type: Number,
            default: 0
        },
        maidens: {
            type: Number,
            default: 0
        },
        wideBalls: {
            type: Number,
            default: 0
        },
        noBalls: {
            type: Number,
            default: 0
        }
    },
    {
        _id: false

    }
);


const fieldingStatsSchema = new mongoose.Schema(
    {
        catches: {
            type: Number,
            default: 0
        },
        stumpings: {
            type: Number,
            default: 0
        },
        runOuts: {
            type: Number,
            default: 0
        },
        catchBehind: {
            type: Number,
            default: 0
        },
        byes: {
            type: Number,
            default: 0
        },
        asstRunOuts: {
            type: Number,
            default: 0
        }
    },
    {
        _id: false

    }
);

exports = {
    battingStatsSchema,
    bowlingStatsSchema,
    fieldingStatsSchema
};