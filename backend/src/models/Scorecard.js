import mongoose from 'mongoose';

const batsmanPerformanceSchema = new mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    runs: { type: Number, default: 0 },
    balls: { type: Number, default: 0 },
    fours: { type: Number, default: 0 },
    sixes: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0.0 },
    outStatus: { type: String, default: 'Not Out' }, // e.g., "b Shami", "c Kohli b Siraj", "Run Out"
});

const bowlerPerformanceSchema = new mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    overs: { type: Number, default: 0.0 }, // e.g., 3.4 overs
    maidens: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    economy: { type: Number, default: 0.0 },
});

const fallOfWicketSchema = new mongoose.Schema({
    wicketNumber: { type: Number, required: true },
    runs: { type: Number, required: true },
    overs: { type: Number, required: true },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const inningsSchema = new mongoose.Schema(
    {
        match: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Match',
            required: true,
        },
        inningsNumber: {
            type: Number,
            required: true, // e.g., 1 or 2
        },
        batting: [batsmanPerformanceSchema],
        bowling: [bowlerPerformanceSchema],
        extras: {
            wide: { type: Number, default: 0 },
            noBall: { type: Number, default: 0 },
            bye: { type: Number, default: 0 },
            legBye: { type: Number, default: 0 },
            total: { type: Number, default: 0 },
        },
        fallOfWickets: [fallOfWicketSchema],
    },
    {
        timestamps: true,
    }
);

const Innings = mongoose.model('Innings', inningsSchema);

export default Innings;