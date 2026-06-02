import { createContext, useContext, useEffect, useState } from "react";

// 1. Create Context
const AuthContext = createContext();

// 2. Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on app start
    useEffect(() => {
        const storedUser = localStorage.getItem("crick_user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    // LOGIN FUNCTION
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("crick_user", JSON.stringify(userData));
    };

    // LOGOUT FUNCTION
    const logout = () => {
        setUser(null);
        localStorage.removeItem("crick_user");
    };

    // CHECK AUTH
    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout,
                isAuthenticated,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// 3. Custom Hook (easy usage)
export const useAuth = () => {
    return useContext(AuthContext);
};