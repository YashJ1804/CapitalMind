import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import {
    FaBars,
    FaTimes,
    FaHome,
    FaChartLine,
    FaHistory,
    FaStar,
    FaUserCircle,
    FaSignOutAlt,
    FaLock,
    FaSignInAlt,
    FaUserPlus
} from "react-icons/fa";

function Navbar() {

    const { user, logout, isAuthenticated } = useAuth();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const handleLogout = () => {

        logout();

        setOpen(false);

        setMobileMenu(false);

        navigate("/");

    };

    const navLink =
        "px-4 py-2 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-all duration-300 font-medium";

    const activeNav =
        "px-4 py-2 rounded-xl bg-blue-600/20 text-cyan-400 font-semibold";

    return (

        <nav className="
fixed
top-0
left-0
w-full
z-50
bg-slate-950/95
backdrop-blur-xl
border-b
border-slate-800
shadow-2xl
">

            <div className="max-w-7xl mx-auto px-5 lg:px-8 py-4 flex items-center justify-between">

                {/* Logo */}

                <Link
                    to="/"
                    className="flex items-center gap-3 group"
                >

                    <div className="
w-11
h-11
rounded-xl
bg-gradient-to-br
from-blue-600
to-cyan-400
flex
items-center
justify-center
shadow-lg
group-hover:scale-110
transition
duration-300
">

                        📈

                    </div>

                    <div>

                        <h1 className="text-2xl font-black text-white tracking-tight">

                            CapitalMind

                        </h1>

                        <p className="text-xs text-slate-400">

                            AI Investment Intelligence

                        </p>

                    </div>

                </Link>

                {/* Desktop */}

                <div className="hidden lg:flex items-center gap-3">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? activeNav : navLink
                        }
                    >
                        Home
                    </NavLink>

                    {isAuthenticated && (

                        <>

                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    isActive ? activeNav : navLink
                                }
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/history"
                                className={({ isActive }) =>
                                    isActive ? activeNav : navLink
                                }
                            >
                                History
                            </NavLink>

                            <NavLink
                                to="/watchlist"
                                className={({ isActive }) =>
                                    isActive ? activeNav : navLink
                                }
                            >
                                Watchlist
                            </NavLink>

                        </>

                    )}

                    {!isAuthenticated ? (

                        <div className="flex items-center gap-3 ml-6">

                            <Link
                                to="/login"
                                className="
px-5
py-2.5
rounded-xl
border
border-slate-700
text-white
hover:border-cyan-400
transition
"
                            >

                                Login

                            </Link>

                            <Link
                                to="/register"
                                className="
px-5
py-2.5
rounded-xl
bg-gradient-to-r
from-blue-600
to-cyan-500
font-semibold
hover:scale-105
transition
shadow-lg
"
                            >

                                Get Started

                            </Link>

                        </div>

                    ) : (

                        <div className="relative ml-4">

                            <button

                                onClick={() => setOpen(!open)}

                                className="
flex
items-center
gap-3
bg-slate-800
border
border-slate-700
hover:border-cyan-500
rounded-full
px-5
py-2.5
transition-all
duration-300
"

                            >

                                <FaUserCircle className="text-cyan-400 text-xl" />

                                <span>

                                    {user?.name}

                                </span>

                            </button>

                            {open && (

                                <div className="
absolute
right-0
mt-4
w-72
rounded-2xl
overflow-hidden
bg-slate-900
border
border-slate-700
shadow-2xl
">

                                    <div className="p-5 border-b border-slate-700">

                                        <h3 className="font-bold text-lg">

                                            {user?.name}

                                        </h3>

                                        <p className="text-slate-400 text-sm">

                                            {user?.email}

                                        </p>

                                    </div>

                                    <Link

                                        to="/watchlist"

                                        onClick={() => setOpen(false)}

                                        className="
flex
items-center
gap-3
px-5
py-4
text-white
hover:bg-slate-800
hover:text-cyan-400
transition
"

                                    >

                                        <FaStar />

                                        Watchlist

                                    </Link>

                                    <Link

                                        to="/history"

                                        onClick={() => setOpen(false)}

                                        className="
flex
items-center
gap-3
px-5
py-4
text-white
hover:bg-slate-800
hover:text-cyan-400
transition
"

                                    >

                                        <FaHistory />

                                        History

                                    </Link>

                                                        <button

                                        onClick={() => {

                                            setShowPasswordModal(true);

                                            setOpen(false);

                                        }}

                                        className="
flex
items-center
gap-3
w-full
px-5
py-4
text-white
hover:bg-slate-800
hover:text-cyan-400
transition
"

                                    >

                                        <FaLock />

                                        Change Password

                                    </button>

                                    <button

                                        onClick={handleLogout}

                                        className="
flex
items-center
gap-3
w-full
px-5
py-4
text-red-400
hover:bg-red-500/10
transition
"

                                    >

                                        <FaSignOutAlt />

                                        Logout

                                    </button>

                                </div>

                            )}

                        </div>

                    )}

                </div>

                {/* Mobile Menu Button */}

                <button

                    onClick={() => setMobileMenu(!mobileMenu)}

                    className="
lg:hidden
text-2xl
text-white
p-3
rounded-xl
hover:bg-slate-800
transition
"

                >

                    {

                        mobileMenu

                            ?

                            <FaTimes />

                            :

                            <FaBars />

                    }

                </button>

            </div>

            {/* Mobile Drawer */}

            {

                mobileMenu && (

                    <div className="
lg:hidden
mx-4
mb-4
rounded-3xl
overflow-hidden
bg-slate-900
border
border-slate-800
shadow-2xl
">

                        <div className="px-6 py-5 border-b border-slate-800">

                            <h2 className="text-xl font-bold text-white">

                                📈 CapitalMind

                            </h2>

                            <p className="text-sm text-slate-400 mt-1">

                                AI Investment Intelligence

                            </p>

                        </div>

                        <NavLink

                            to="/"

                            onClick={() => setMobileMenu(false)}

                            className={({ isActive }) =>

                                `

flex
items-center
gap-3
px-6
py-4
font-medium
transition-all
duration-300

${

isActive

?

"bg-blue-600/20 text-cyan-400"

:

"text-white hover:bg-slate-800 hover:text-cyan-400"

}

`

                            }

                        >

                            <FaHome />

                            Home

                        </NavLink>

                        {

                            isAuthenticated

                                ?

                                <>

                                    <NavLink

                                        to="/dashboard"

                                        onClick={() => setMobileMenu(false)}

                                        className={({ isActive }) =>

                                            `

flex
items-center
gap-3
px-6
py-4
font-medium
transition-all

${

isActive

?

"bg-blue-600/20 text-cyan-400"

:

"text-white hover:bg-slate-800 hover:text-cyan-400"

}

`

                                        }

                                    >

                                        <FaChartLine />

                                        Dashboard

                                    </NavLink>

                                    <NavLink

                                        to="/history"

                                        onClick={() => setMobileMenu(false)}

                                        className={({ isActive }) =>

                                            `

flex
items-center
gap-3
px-6
py-4
font-medium
transition-all

${

isActive

?

"bg-blue-600/20 text-cyan-400"

:

"text-white hover:bg-slate-800 hover:text-cyan-400"

}

`

                                        }

                                    >

                                        <FaHistory />

                                        History

                                    </NavLink>

                                    <NavLink

                                        to="/watchlist"

                                        onClick={() => setMobileMenu(false)}

                                        className={({ isActive }) =>

                                            `

flex
items-center
gap-3
px-6
py-4
font-medium
transition-all

${

isActive

?

"bg-blue-600/20 text-cyan-400"

:

"text-white hover:bg-slate-800 hover:text-cyan-400"

}

`

                                        }

                                    >

                                        <FaStar />

                                        Watchlist

                                    </NavLink>

                                    <button

                                        onClick={() => {

                                            setShowPasswordModal(true);

                                            setMobileMenu(false);

                                        }}

                                        className="
w-full
text-left
flex
items-center
gap-3
px-6
py-4
text-white
hover:bg-slate-800
hover:text-cyan-400
transition
"

                                    >

                                        <FaLock />

                                        Change Password

                                    </button>

                                    <button

                                        onClick={handleLogout}

                                        className="
w-full
text-left
flex
items-center
gap-3
px-6
py-4
text-red-400
hover:bg-red-500/10
transition
"

                                    >

                                        <FaSignOutAlt />

                                        Logout

                                    </button>

                                </>

                                :

                                <>

                                    <Link

                                        to="/login"

                                        onClick={() => setMobileMenu(false)}

                                        className="
flex
items-center
gap-3
px-6
py-4
text-white
hover:bg-slate-800
hover:text-cyan-400
transition
"

                                    >

                                        <FaSignInAlt />

                                        Login

                                    </Link>

                                    <Link

                                        to="/register"

                                        onClick={() => setMobileMenu(false)}

                                        className="
flex
items-center
gap-3
px-6
py-4
text-white
hover:bg-slate-800
hover:text-cyan-400
transition
"

                                    >

                                        <FaUserPlus />

                                        Register

                                    </Link>

                                </>

                        }

                    </div>

                )

            }

            {

                showPasswordModal && (

                    <ChangePasswordModal

                        onClose={() =>

                            setShowPasswordModal(false)

                        }

                    />

                )

            }

        </nav>

    );

}

export default Navbar;