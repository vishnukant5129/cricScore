// _id
// tournament
// team
// status
// paymentStatus


import mongoose from 'mongoose';

const tournamentRegistrationSchema = new mongoose.Schema(
    {
        tournament: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tournament',
            required: true,
        },
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending',
        },
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
            default: 'Pending',
        },
    },
    {
        timestamps: true,
    }
);

// Ek team ek tournament me ek hi baar register kar sake, iske liye compound index
tournamentRegistrationSchema.index({ tournament: 1, team: 1 }, { unique: true });

const TournamentRegistration = mongoose.model('TournamentRegistration', tournamentRegistrationSchema);

export default TournamentRegistration;