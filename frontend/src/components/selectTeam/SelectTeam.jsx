import React, { useState } from "react";
import api from "../../api/api.js";

const SelectTeam = () => {
    const [data, setData] = useState([]);

    const fetchTeams = async () => {
        try {
            const res = await api.get(
                "/match/teams"
            );

            setData(res.data.data);
            console.log(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <button onClick={fetchTeams}>Fetch Teams</button>

            {data.map((team) => (
                <div key={team._id}>
                    <h3>{team.name}</h3>
                    <p>{team.location}</p>
                </div>
            ))}
        </div>
    );
};

export default SelectTeam;