import React, { useEffect, useState } from "react";
import api from "../../api/api.js";
import { useNavigate, useLocation } from "react-router-dom";

const SelectTeam = () => {
    const navigate = useNavigate();

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [selectTeam, SetSelectTeam] = useState();

    const location = useLocation();
    useEffect(() => {
        setTeams(location.state?.teams || []);
    }, [location.state]);

    const handleSelectTeam = (team) => {
        navigate("/start-match", {
            state: {
                team: team,
            },
        });
    };

    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl text-black font-bold text-center mb-8">
                    Select Team
                </h1>

                {loading ? (
                    <div className="text-center text-lg font-medium">
                        Loading Teams...
                    </div>
                ) : teams.length === 0 ? (
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

                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                        {team.shortName}
                                    </span>
                                </div>

                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        📍 <strong>{team.location}</strong>
                                    </p>

                                    <p>
                                        👨‍✈️ Captain:
                                        <span className="ml-2 font-semibold text-black">
                                            {team.captain?.length || 0}
                                        </span>
                                    </p>

                                    <p>
                                        🏏 Players:
                                        <span className="ml-2 font-semibold text-black">
                                            {team.players?.length || 0}
                                        </span>
                                    </p>
                                </div>

                                <div className="mt-5 pt-4 border-t flex justify-between text-sm">
                                    <span>
                                        🏆 Won: {team.matchesWon || 0}
                                    </span>

                                    <span>
                                        🎮 Played: {team.matchesPlayed || 0}
                                    </span>
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