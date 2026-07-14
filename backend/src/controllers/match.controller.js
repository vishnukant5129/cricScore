import Match from "../models/Match.js";
import Team from "../models/Team.js";
import Ground from "../models/Ground.js";
import Tournament from "../models/Tournament.js";

export const createMatch = async (req, res) => {
    try {
        const {
            matchNumber,
            tournament,
            teamA,
            teamB,
            teamAPlayingXI,
            teamBPlayingXI,
            teamASubstitutes,
            teamBSubstitutes,
            teamACaptain,
            teamBCaptain,
            teamAWicketKeeper,
            teamBWicketKeeper,
            overs,
            ballsPerOver,
            matchType,
            ballType,
            pitchType,
            ground,
            venue,
            city,
            matchDate,
            toss,
            scorer,
            umpires,
            commentators,
            notes,
        } = req.body;

        if (!teamA || !teamB || !overs || !matchDate) {
            return res.status(400).json({
                success: false,
                message: "Team A, Team B, Overs and Match Date are required",
            });
        }

        if (teamA === teamB) {
            return res.status(400).json({
                success: false,
                message: "Both teams cannot be the same",
            });
        }

        const teamAExists = await Team.findById(teamA);
        const teamBExists = await Team.findById(teamB);

        if (!teamAExists || !teamBExists) {
            return res.status(404).json({
                success: false,
                message: "One or both teams not found",
            });
        }

        if (ground) {
            const groundExists = await Ground.findById(ground);

            if (!groundExists) {
                return res.status(404).json({
                    success: false,
                    message: "Ground not found",
                });
            }
        }

        if (tournament) {
            const tournamentExists = await Tournament.findById(tournament);

            if (!tournamentExists) {
                return res.status(404).json({
                    success: false,
                    message: "Tournament not found",
                });
            }
        }

        const match = await Match.create({
            matchNumber,
            tournament,
            teamA,
            teamB,
            teamAPlayingXI,
            teamBPlayingXI,
            teamASubstitutes,
            teamBSubstitutes,
            teamACaptain,
            teamBCaptain,
            teamAWicketKeeper,
            teamBWicketKeeper,
            overs,
            ballsPerOver: ballsPerOver || 6,
            matchType,
            ballType,
            pitchType,
            ground,
            venue,
            city,
            matchDate,
            toss,
            scorer,
            umpires,
            commentators,
            notes,
            createdBy: req.user.id,
        });

        const populatedMatch = await Match.findById(match._id)
            .populate("teamA", "name shortName")
            .populate("teamB", "name shortName")
            .populate("ground", "name city")
            .populate("tournament", "name")
            .populate("scorer", "name email");

        return res.status(201).json({
            success: true,
            message: "Match created successfully",
            match: populatedMatch,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllMatches = async (req, res) => {

}
export const getMatchById = async (req, res) => {

}
export const updateMatch = async (req, res) => {

}
export const deleteMatch = async (req, res) => {

}
export const startMatch = async (req, res) => {

}
export const endMatch = async (req, res) => {

}
export const conductToss = async (req, res) => {

}
export const updateResult = async (req, res) => {

}

