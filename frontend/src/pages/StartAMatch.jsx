import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/api.js";
import { useMatch } from "../context/MatchContext";

const StartAMatch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [loading, setLoading] = useState(false);

  const {
    teamA,
    setTeamA,
    teamB,
    setTeamB,
  } = useMatch();

  const fetchTeams = async (type) => {
    try {
      setLoading(true);

      const res = await api.get("/match/teams");

      navigate("/selectTeam", {
        state: {
          teams: res.data.data,
          type,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-xl w-[450px] shadow-lg">
        <h1 className="text-xl font-bold mb-6 text-center">
          Start A Match
        </h1>

        {/* TEAM A */}
        <div className="mb-4">
          <div className="text-center">
            <label className="text-sm text-gray-400">
              Select Team A
            </label>
          </div>

          <div className="flex justify-center mt-3">
            {teamA ? (
              <div className="text-center">
                <h2 className="font-bold text-lg">
                  {teamA.name}
                </h2>
                <p className="text-gray-400">
                  {teamA.location}
                </p>
              </div>
            ) : (
              <button
                onClick={() => fetchTeams("teamA")}
                className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 transition"
              >
                <Plus className="w-6 h-6 text-green-400" />
              </button>
            )}
          </div>
        </div>

        <div className="text-center font-bold text-xl my-4">
          VS
        </div>

        {/* TEAM B */}
        <div className="mb-4">
          <div className="text-center">
            <label className="text-sm text-gray-400">
              Select Team B
            </label>
          </div>

          <div className="flex justify-center mt-3">
            {teamB ? (
              <div className="text-center">
                <h2 className="font-bold text-lg">
                  {teamB.name}
                </h2>
                <p className="text-gray-400">
                  {teamB.location}
                </p>
              </div>
            ) : (
              <button
                disabled={!teamA}
                onClick={() => fetchTeams("teamB")}
                className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 transition disabled:opacity-50"
              >
                <Plus className="w-6 h-6 text-green-400" />
              </button>
            )}
          </div>
        </div>

        <button
          disabled={!teamA || !teamB || loading}
          className="w-full bg-green-500 hover:bg-green-600 py-2 rounded mt-4 disabled:opacity-50"
        >
          Start Match
        </button>
      </div>
    </div>
  );
};

export default StartAMatch;