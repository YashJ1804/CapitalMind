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

        <nav
className="
fixed
top-0
left-0
w-full
z-50
bg-slate-950/80
backdrop-blur-xl
border-b
border-slate-800
shadow-2xl
transition-all
duration-300
">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap justify-between items-center gap-4">

                {/* Logo */}

                <Link
    to="/"
    className="flex items-center gap-3 group"
>
    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
        📈
    </div>

    <div>
        <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">
            CapitalMind
        </h1>

        <p className="text-xs text-slate-400 -mt-1">
            AI Investment Intelligence
        </p>
    </div>
</Link>

                {/* Navigation */}

                <>
    {/* Desktop Navigation */}

    <div className="hidden lg:flex items-center gap-8">

        <Link
            to="/"
            className="
px-4
py-2
rounded-xl
text-slate-300
hover:bg-slate-800
hover:text-blue-400
transition-all
duration-300
font-medium
"
        >
            Home
        </Link>

        <Link
            to="/dashboard"
            className="
px-4
py-2
rounded-xl
text-slate-300
hover:bg-slate-800
hover:text-blue-400
transition-all
duration-300
font-medium
"
        >
            Dashboard
        </Link>

        <Link
            to="/history"
            className="
px-4
py-2
rounded-xl
text-slate-300
hover:bg-slate-800
hover:text-blue-400
transition-all
duration-300
font-medium
"
        >
            History
        </Link>

        <Link
            to="/watchlist"
            className="
px-4
py-2
rounded-xl
text-slate-300
hover:bg-slate-800
hover:text-blue-400
transition-all
duration-300
font-medium
"
        >
            Watchlist
        </Link>

        {/* User Dropdown */}

        <div className="relative">

            <button

                onClick={() => setOpen(!open)}

                className="
flex
items-center
gap-2
px-5
py-2.5
rounded-full
bg-slate-800
border
border-slate-700
hover:border-blue-500
hover:bg-slate-700
transition-all
duration-300
shadow-lg
"

            >

                👤 {user?.name}

            </button>

            {open && (

                <div className="
absolute
right-0
mt-4
w-72
rounded-2xl
bg-slate-900/95
backdrop-blur-xl
border
border-slate-700
shadow-2xl
overflow-hidden
animate-fadeIn
">

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

                        className="block px-4 py-3 hover:bg-slate-800
hover:text-blue-400
transition"

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

        className="
lg:hidden
text-2xl
p-2
rounded-xl
hover:bg-slate-800
transition
"

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

    <div className="
lg:hidden
mt-4
rounded-2xl
bg-slate-900/95
backdrop-blur-xl
border
border-slate-800
shadow-2xl
overflow-hidden
">

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

            className="block w-full text-left px-5 py-4 text-red-400 hover:bg-red-500/10 transition"

        >

            🚪 Logout

        </button>

    </div>

)}

        </nav>

    );

}

export default Navbar;