import { createContext, useContext, useState } from "react";

const MatchContext = createContext();

export const MatchProvider = ({ children }) => {
    const [teamA, setTeamA] = useState(null);
    const [teamB, setTeamB] = useState(null);

    return (
        <MatchContext.Provider
            value={{
                teamA,
                setTeamA,
                teamB,
                setTeamB,
            }}
        >
            {children}
        </MatchContext.Provider>
    );
};

export const useMatch = () => {
    return useContext(MatchContext);
};