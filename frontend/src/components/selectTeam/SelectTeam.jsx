import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMatch } from "../../context/MatchContext";

const SelectTeam = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [teams, setTeams] = useState([]);

    const {
        teamA,
        setTeamA,
        teamB,
        setTeamB,
    } = useMatch();

    useEffect(() => {
        if (!location.state?.teams) return;

        let filteredTeams = location.state.teams;

        if (
            location.state.type === "teamB" &&
            teamA
        ) {
            filteredTeams = filteredTeams.filter(
                (team) => team._id !== teamA._id
            );
        }

        setTeams(filteredTeams);
    }, [location.state, teamA]);

    const handleSelectTeam = (team) => {
        if (location.state.type === "teamA") {
            setTeamA(team);
        }

        if (location.state.type === "teamB") {
            setTeamB(team);
        }

        navigate("/start-match");
    };

    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl text-black font-bold text-center mb-8">
                    Select Team
                </h1>

                {teams.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No Teams Found
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teams.map((team) => (
                            <div
                                key={team._id}
                                className="
                  bg-white
                  rounded-2xl
                  shadow-md
                  p-5
                  border
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {team.name}
                                    </h2>
                                </div>

                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        📍 <strong>{team.location}</strong>
                                    </p>
                                </div>

                                <button
                                    className="
                    w-full
                    mt-5
                    bg-blue-600
                    text-white
                    py-2
                    rounded-lg
                    font-medium
                    hover:bg-blue-700
                    transition
                  "
                                    onClick={() => handleSelectTeam(team)}
                                >
                                    Select Team
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectTeam;