import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest } from "../api/apiClient";
import { redirect } from "react-router-dom";

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
        const data = await loginRequest(email, password);
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth(data);
        setLoading(false);
    }

    const logout = () => {
        setAuth({});
        localStorage.removeItem("auth");
        redirect("/login");
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
