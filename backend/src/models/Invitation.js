_id
team
player
status


import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema(
    {
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true,
        },

        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
            required: true,
        },

        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

// Prevent sending multiple pending invitations
invitationSchema.index(
    { team: 1, player: 1 },
    { unique: true }
);

const Invitation = mongoose.model("Invitation", invitationSchema);

export default Invitation;