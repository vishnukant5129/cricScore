import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import api from "../api/api.js";

const StartAMatch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [teams, setTeams] = useState([]);
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [step, setStep] = useState("A");
  const [loading, setLoading] = useState()


  const fetchTeams = async () => {
    try {
      setLoading(true);

      const res = await api.get("/match/teams");
      console.log(res.data.data)
      navigate("/selectTeam", {
        state: {
          // step,
          // selectedTeamA: teamA,
          teams: res.data.data
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-xl w-[400px] shadow-lg">

        <h1 className="text-xl font-bold mb-6 text-center">
          Start A Match
        </h1>

        {/* TEAM A */}
        <div className="mb-4">
          <div className="flex items-center justify-center">
            <label className="text-sm text-gray-400">Select Team A</label>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => fetchTeams()}   // demo value
              className="w-20 h-20 mt-2 rounded-full flex items-center justify-center p-3 rounded bg-gray-700 hover:bg-gray-600 transition"
            >
              <Plus className="w-5 h-5 text-green-400" />
            </button>
          </div>
        </div>

        {/* VS */}
        <div className="text-center text-gray-400 font-bold my-2">
          VS
        </div>

        {/* TEAM B */}
        <div className="mb-4">
          <div className="flex items-center justify-center">
            <label className="text-sm text-gray-400">Select Team B</label>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => fetchTeams()}   // demo value
              className="w-20 h-20 mt-2 rounded-full flex items-center justify-center p-3 rounded bg-gray-700 hover:bg-gray-600 transition"
            >
              <Plus className="w-5 h-5 text-green-400" />
            </button>
          </div>
        </div>

        {/* START BUTTON */}
        <button
          // onClick={handleStartMatch()}
          className="w-full bg-green-500 hover:bg-green-600 py-2 rounded mt-4"
        >
          Start Match
        </button>

      </div>
    </div>
  );
};

export default StartAMatch;