import { useState } from "react";
import { Eye, Loader, User } from "lucide-react";
import TextField from "../components/TextField";
import useAppContext from "../context/useAppContext";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { showBanner } = useAppContext();
    const { login, loading } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            showBanner({
                title: "Login Failed!",
                description: "Please enter username and password.",
                type: "error"
            })
            return;
        }

        try {
            await login(username, password)
            navigate("/");
        } catch(error) {
            showBanner({
                title: "Login Failed!",
                description: error.message || "Invalid credentials",
                type: "error"
            });
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="border border-border rounded-2xl p-8 min-w-1/3 mx-auto bg-surface">
                <h1 className="text-2xl font-bold mb-6">Login Page</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        placeholder="Enter your username"
                        leftIcon={<User size={16} className="text-on-surface/70" />}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={false}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        leftIcon={<Eye size={16} className="text-on-surface/70" />}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={false}
                    />
                    <button
                        type="submit"
                        className="mt-8 w-full bg-primary-500 font-bold text-on-primary p-2 rounded-lg
                                    hover:opacity-90 active:scale-95 cursor-pointer transition flex items-center justify-center">
                        {loading ? <Loader size={20} className="text-on-primary" /> : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
