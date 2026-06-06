import { useEffect, useState } from "react";
import api from "../api/api.js";

import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {

      if (!token) {
        setError("No token found, please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/player/profile", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setPlayer(res.data.user);
      } catch (err) {
        setError("Failed to load player profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await api.post(
        "/auth/logout",
        { withCredentials: true }
      );

      alert(res.data.message);

      localStorage.removeItem("user");

      navigate("/");

    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-950">
        <h2 className="text-xl font-semibold text-white">Loading...</h2>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-950">
        <h2 className="text-red-500 font-semibold">{error || "No profile data available"}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-slate-900 shadow-2xl">

        {/* Cover */}
        <div className="h-40 bg-gradient-to-r from-cyan-500 to-blue-600" />

        {/* Profile */}
        <div className="relative px-6 pb-8">

          <div className="-mt-16 flex flex-col md:flex-row md:items-end gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {player.fullname}
              </h1>

              <p className="text-cyan-400 font-medium">
                {player.playingRole || "Player"}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">

            <DetailCard
              label="Date of Birth"
              value={player.dob ? new Date(player.dob).toLocaleDateString() : "N/A"}
            />

            <DetailCard
              label="Location"
              value={player.location || "N/A"}
            />

            <DetailCard
              label="Mobile Number"
              value={player.mobilenumber || "N/A"}
            />

            <DetailCard
              label="Team"
              value={player.team || "N/A"}
            />
          </div>

          {/* Stats - Using Optional Chaining (?.) to handle missing properties safely */}
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-white">
              Career Stats
            </h2>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">

              <StatCard
                title="Matches"
                value={player.stats?.matches ?? "-"}
              />

              <StatCard
                title="Runs"
                value={player.stats?.runs ?? "-"}
              />

              <StatCard
                title="Average"
                value={player.stats?.average ?? "-"}
              />

              <StatCard
                title="100s"
                value={player.stats?.hundreds ?? "-"}
              />

              <StatCard
                title="50s"
                value={player.stats?.fifties ?? "-"}
              />
            </div>
          </div>
          <button onClick={handleLogout}>
            Logout
          </button>

        </div>
      </div>
    </div>
  );
};

const DetailCard = ({ label, value }) => (
  <div className="rounded-xl bg-slate-800 p-4">
    <p className="text-sm text-slate-400">{label}</p>
    <p className="mt-1 font-semibold text-white">{value}</p>
  </div>
);

const StatCard = ({ title, value }) => (
  <div className="rounded-xl bg-slate-800 p-4 text-center">
    <h3 className="text-2xl font-bold text-cyan-400">
      {value}
    </h3>
    <p className="mt-1 text-sm text-slate-400">
      {title}
    </p>
  </div>
);

export default Profile;