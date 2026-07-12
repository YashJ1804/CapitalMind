import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap justify-between items-center gap-4">

                {/* Logo */}

                <Link
                    to="/"
                    className="text-xl sm:text-2xl lg:text-3xl font-bold"
                >

                    📈 CapitalMind

                </Link>

                {/* Navigation */}

                <>
    {/* Desktop Navigation */}

    <div className="hidden lg:flex items-center gap-8">

        <Link
            to="/"
            className="text-slate-300 hover:text-white transition"
        >
            Home
        </Link>

        <Link
            to="/dashboard"
            className="text-slate-300 hover:text-white transition"
        >
            Dashboard
        </Link>

        <Link
            to="/history"
            className="text-slate-300 hover:text-white transition"
        >
            History
        </Link>

        <Link
            to="/watchlist"
            className="text-slate-300 hover:text-white transition"
        >
            Watchlist
        </Link>

        {/* User Dropdown */}

        <div className="relative">

            <button

                onClick={() => setOpen(!open)}

                className="bg-slate-800 hover:bg-slate-700 rounded-full px-5 py-2"

            >

                👤 {user?.name}

            </button>

            {open && (

                <div className="absolute right-0 mt-3 w-64 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">

                    <div className="p-4 border-b border-slate-700">

                        <p className="font-semibold">

                            {user?.name}

                        </p>

                        <p className="text-sm text-slate-400">

                            {user?.email}

                        </p>

                    </div>

                    <Link

                        to="/watchlist"

                        className="block px-4 py-3 hover:bg-slate-800"

                    >

                        ⭐ Watchlist

                    </Link>

                    <Link

                        to="/history"

                        className="block px-4 py-3 hover:bg-slate-800"

                    >

                        📜 History

                    </Link>

                    <button

                        onClick={() => {

                            setShowPasswordModal(true);

                            setOpen(false);

                        }}

                        className="w-full text-left px-4 py-3 hover:bg-slate-800"

                    >

                        🔒 Change Password

                    </button>

                    <button

                        onClick={handleLogout}

                        className="w-full text-left px-4 py-3 text-red-400 hover:bg-slate-800"

                    >

                        🚪 Logout

                    </button>

                </div>

            )}

        </div>

    </div>

    {/* Mobile Menu Button */}

    <button

        className="lg:hidden text-2xl"

        onClick={() => setMobileMenu(!mobileMenu)}

    >

        {mobileMenu ? <FaTimes /> : <FaBars />}

    </button>
</>

            </div>
            {showPasswordModal && (

    <ChangePasswordModal

        onClose={() => setShowPasswordModal(false)}

    />

)}
{mobileMenu && (

    <div className="lg:hidden mt-4 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">

        <Link

            to="/"

            onClick={() => setMobileMenu(false)}

            className="block px-5 py-4 hover:bg-slate-800"

        >

            🏠 Home

        </Link>

        <Link

            to="/dashboard"

            onClick={() => setMobileMenu(false)}

            className="block px-5 py-4 hover:bg-slate-800"

        >

            📊 Dashboard

        </Link>

        <Link

            to="/history"

            onClick={() => setMobileMenu(false)}

            className="block px-5 py-4 hover:bg-slate-800"

        >

            📜 History

        </Link>

        <Link

            to="/watchlist"

            onClick={() => setMobileMenu(false)}

            className="block px-5 py-4 hover:bg-slate-800"

        >

            ⭐ Watchlist

        </Link>

        <button

            onClick={() => {

                setShowPasswordModal(true);

                setMobileMenu(false);

            }}

            className="block w-full text-left px-5 py-4 hover:bg-slate-800"

        >

            🔒 Change Password

        </button>

        <button

            onClick={handleLogout}

            className="block w-full text-left px-5 py-4 text-red-400 hover:bg-slate-800"

        >

            🚪 Logout

        </button>

    </div>

)}

        </nav>

    );

}

export default Navbar;