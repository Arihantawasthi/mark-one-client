import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest } from "../api/apiClient";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const raw = localStorage.getItem("auth");
        if (raw) {
            setAuth(JSON.parse(raw));
        }

        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        const data = await loginRequest(email, password);
        if (data.requestStatus === 0) {
            setLoading(false);
            throw new Error(data.message || "Login failed");
        }
        localStorage.setItem("auth", JSON.stringify(data.data));
        setAuth(data.data);
        setLoading(false);
    }

    const logout = () => {
        setAuth({});
        localStorage.removeItem("auth");
    }

    return (
        <AuthContext.Provider value={{ auth, login, logout, loading }}>
            { children }
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}


export { AuthContext, AuthProvider, useAuth };
