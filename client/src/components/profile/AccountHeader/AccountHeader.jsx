import { FaUserCircle } from "react-icons/fa";

function AccountHeader({ user }) {

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

            <div className="flex flex-col items-center gap-6 md:flex-row">

                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-6xl text-white shadow-lg">

                    {user?.name
                        ? user.name.charAt(0).toUpperCase()
                        : <FaUserCircle />
                    }

                </div>

                <div className="flex-1">

                    <h1 className="text-4xl font-black text-white">

                        {user?.name || "Guest User"}

                    </h1>

                    <p className="mt-2 text-lg text-slate-400">

                        {user?.email || "No email available"}

                    </p>

                    <div className="mt-6 inline-flex rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">

                        ● Account Active

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AccountHeader;