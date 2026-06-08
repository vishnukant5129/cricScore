import Team from "../models/Team.js";

export const getTeamsForMatch = async (req, res) => {
    try {
        const teams = await Team.find().select(
            "name location captain"
        );

        res.status(200).json({
            success: true,
            data: teams,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching teams for match",
            error: error.message,
        });
    }
};














// export const createTeam = async (req, res) => {
//     try {
//         const { name, shortName, logo, description, owner } = req.body;

//         const team = new Team({
//             name,
//             shortName,
//             logo,
//             description,
//             owner,
//         });

//         const savedTeam = await team.save();

//         res.status(201).json({
//             success: true,
//             message: "Team created successfully",
//             data: savedTeam,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error creating team",
//             error: error.message,
//         });
//     }
// };

// /**
//  * GET ALL TEAMS
//  */
// export const getAllTeams = async (req, res) => {
//     try {
//         const teams = await Team.find().populate("owner", "name email");

//         res.status(200).json({
//             success: true,
//             data: teams,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error fetching teams",
//             error: error.message,
//         });
//     }
// };

// /**
//  * GET SINGLE TEAM
//  */
// export const getTeamById = async (req, res) => {
//     try {
//         const team = await Team.findById(req.params.id)
//             .populate("owner", "name email")
//             .populate("players");

//         if (!team) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Team not found",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             data: team,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error fetching team",
//             error: error.message,
//         });
//     }
// };

// /**
//  * UPDATE TEAM
//  */
// export const updateTeam = async (req, res) => {
//     try {
//         const updatedTeam = await Team.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true, runValidators: true }
//         );

//         if (!updatedTeam) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Team not found",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Team updated successfully",
//             data: updatedTeam,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error updating team",
//             error: error.message,
//         });
//     }
// };

// /**
//  * DELETE TEAM
//  */
// export const deleteTeam = async (req, res) => {
//     try {
//         const deletedTeam = await Team.findByIdAndDelete(req.params.id);

//         if (!deletedTeam) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Team not found",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Team deleted successfully",
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error deleting team",
//             error: error.message,
//         });
//     }
// };

