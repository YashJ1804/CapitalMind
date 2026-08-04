import { FaLock, FaShieldAlt } from "react-icons/fa";

function SecurityCard({ onChangePassword }) {

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

            <div className="mb-8">

                <h2 className="text-3xl font-black text-white">

                    🔒 Security

                </h2>

                <p className="mt-2 text-slate-400">

                    Manage your account security and password.

                </p>

            </div>

            <div className="space-y-6">

                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-6">

                    <div className="flex items-center gap-4">

                        <div className="rounded-xl bg-green-500/10 p-4">

                            <FaShieldAlt className="text-2xl text-green-400" />

                        </div>

                        <div>

                            <h3 className="text-xl font-bold text-white">

                                Account Status

                            </h3>

                            <p className="text-slate-400">

                                Your account is secure.

                            </p>

                        </div>

                    </div>

                    <span className="rounded-full bg-green-500/10 px-4 py-2 font-semibold text-green-400">

                        Active

                    </span>

                </div>

                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-6">

                    <div className="flex items-center gap-4">

                        <div className="rounded-xl bg-blue-500/10 p-4">

                            <FaLock className="text-2xl text-blue-400" />

                        </div>

                        <div>

                            <h3 className="text-xl font-bold text-white">

                                Password

                            </h3>

                            <p className="text-slate-400">

                                Update your account password.

                            </p>

                        </div>

                    </div>

                    <button

                        onClick={onChangePassword}

                        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"

                    >

                        Change Password

                    </button>

                </div>

            </div>

        </div>

    );

}

export default SecurityCard;