import React, { useState } from "react";
import { Plus, Users, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";
import { useMatch } from "../context/MatchContext";

const StartAMatch = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    teamA,
    teamB,
    teamAPlayingXI,
    teamBPlayingXI,
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

  const bothTeamsSelected = teamA && teamB;

  const squadsReady =
    teamAPlayingXI?.length === 11 &&
    teamBPlayingXI?.length === 11;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg border border-gray-700">
        <h1 className="text-2xl font-bold text-center mb-6">
          Start A Match
        </h1>

        {/* Team A */}
        <div className="mb-6">
          <div className="text-center mb-3">
            <label className="text-sm text-gray-400">
              Select Team A
            </label>
          </div>

          <div className="flex justify-center">
            {teamA ? (
              <div className="text-center">
                <h2 className="font-bold text-lg text-green-400">
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
                <Plus className="w-7 h-7 text-green-400" />
              </button>
            )}
          </div>
        </div>

        {/* VS */}
        <div className="text-center text-2xl font-bold my-6 text-yellow-400">
          VS
        </div>

        {/* Team B */}
        <div className="mb-6">
          <div className="text-center mb-3">
            <label className="text-sm text-gray-400">
              Select Team B
            </label>
          </div>

          <div className="flex justify-center">
            {teamB ? (
              <div className="text-center">
                <h2 className="font-bold text-lg text-green-400">
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
                <Plus className="w-7 h-7 text-green-400" />
              </button>
            )}
          </div>
        </div>

        {/* Select Playing XI */}
        {bothTeamsSelected && (
          <button
            onClick={() =>
              navigate("/selectSquad", {
                state: {
                  teamA,
                  teamB,
                },
              })
            }
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition mb-3"
          >
            <Users size={18} />
            Select Playing XI
          </button>
        )}

        {/* Start Match */}
        <button
          disabled={!squadsReady || loading}
          onClick={() => navigate("/toss")}
          className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={18} />
          Start Match
        </button>

        {!squadsReady && bothTeamsSelected && (
          <p className="text-center text-xs text-gray-400 mt-3">
            Select Playing XI for both teams before starting the match.
          </p>
        )}
      </div>
    </div>
  );
};

export default StartAMatch;