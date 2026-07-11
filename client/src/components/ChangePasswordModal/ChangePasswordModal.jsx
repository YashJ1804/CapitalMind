import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function ChangePasswordModal({ onClose }) {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (newPassword !== confirmPassword) {

            return toast.error("Passwords do not match");

        }

        try {

            setLoading(true);

            await api.post("/auth/change-password", {

                currentPassword,

                newPassword

            });

            toast.success("Password changed successfully");

            onClose();

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to change password"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-md">

                <h2 className="text-3xl font-bold mb-6">

                    🔒 Change Password

                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <input

                        type="password"

                        placeholder="Current Password"

                        value={currentPassword}

                        onChange={(e)=>setCurrentPassword(e.target.value)}

                        className="w-full p-3 rounded-xl bg-slate-800"

                    />

                    <input

                        type="password"

                        placeholder="New Password"

                        value={newPassword}

                        onChange={(e)=>setNewPassword(e.target.value)}

                        className="w-full p-3 rounded-xl bg-slate-800"

                    />

                    <input

                        type="password"

                        placeholder="Confirm Password"

                        value={confirmPassword}

                        onChange={(e)=>setConfirmPassword(e.target.value)}

                        className="w-full p-3 rounded-xl bg-slate-800"

                    />

                    <div className="flex gap-3">

                        <button

                            type="submit"

                            disabled={loading}

                            className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl py-3"

                        >

                            {loading ? "Saving..." : "Save"}

                        </button>

                        <button

                            type="button"

                            onClick={onClose}

                            className="flex-1 bg-slate-700 hover:bg-slate-600 rounded-xl py-3"

                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default ChangePasswordModal;