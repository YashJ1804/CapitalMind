import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
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

            const response = await api.post("/auth/register", form);

            alert(response.data.message);

            navigate("/login");

        } catch (err) {

            setError(
                err.response?.data?.message || "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center">

            <div className="bg-slate-900 p-10 rounded-2xl w-full max-w-md border border-slate-800">

                <h1 className="text-4xl font-bold text-white text-center">

                    Join CapitalMind

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    <input

                        type="text"

                        name="name"

                        placeholder="Full Name"

                        value={form.name}

                        onChange={handleChange}

                        className="w-full bg-slate-800 text-white p-4 rounded-xl"

                        required

                    />

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

                        {loading ? "Creating..." : "Register"}

                    </button>

                </form>

                <p className="text-slate-400 mt-6 text-center">

                    Already have an account?

                    <Link

                        to="/login"

                        className="text-blue-400 ml-2"

                    >

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;