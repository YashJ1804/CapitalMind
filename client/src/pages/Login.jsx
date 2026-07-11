import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const response = await api.post("/auth/login", form);

            login(
                response.data.user,
                response.data.token
            );

            navigate("/");

        } catch (err) {

            setError(
                err.response?.data?.message || "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center">

            <div className="bg-slate-900 p-10 rounded-2xl w-full max-w-md border border-slate-800">

                <h1 className="text-4xl font-bold text-white text-center">

                    Welcome Back

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    <input

                        type="email"

                        name="email"

                        placeholder="Email"

                        value={form.email}

                        onChange={handleChange}

                        className="w-full bg-slate-800 text-white p-4 rounded-xl"

                        required

                    />

                    <input

                        type="password"

                        name="password"

                        placeholder="Password"

                        value={form.password}

                        onChange={handleChange}

                        className="w-full bg-slate-800 text-white p-4 rounded-xl"

                        required

                    />

                    {error && (

                        <p className="text-red-400">

                            {error}

                        </p>

                    )}

                    <button

                        className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-xl text-white font-semibold"

                        disabled={loading}

                    >

                        {loading ? "Signing In..." : "Login"}

                    </button>

                </form>

                <p className="text-slate-400 mt-6 text-center">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-400 ml-2"
                    >

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;