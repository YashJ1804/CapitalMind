import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AppLayout from "../layouts/AppLayout";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Settings() {

    const { user, updateUser, logout } = useAuth();

    const [settings, setSettings] = useState({
        defaultMarket: "INDIA",
        notifications: true,
        emailNotifications: false
    });

    const [saving, setSaving] = useState(false);

    useEffect(() => {

        if (user?.settings) {

            setSettings({
                defaultMarket:
                    user.settings.defaultMarket || "INDIA",

                notifications:
                    user.settings.notifications ?? true,

                emailNotifications:
                    user.settings.emailNotifications ?? false
            });

        }

    }, [user]);

    const handleMarketChange = (market) => {

        setSettings((current) => ({
            ...current,
            defaultMarket: market
        }));

    };

    const handleToggle = (field) => {

        setSettings((current) => ({
            ...current,
            [field]: !current[field]
        }));

    };

    const handleSave = async () => {

        try {

            setSaving(true);

            const response = await api.put(
                "/auth/settings",
                settings
            );

            const updatedSettings =
                response.data?.data?.settings || settings;

            updateUser({
                settings: updatedSettings
            });

            localStorage.setItem(
                "capitalmind_settings",
                JSON.stringify(updatedSettings)
            );

            toast.success("Settings saved successfully.");

        } catch (error) {

            console.error(
                "Failed to save settings:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to save settings."
            );

        } finally {

            setSaving(false);

        }

    };

    return (

        <AppLayout>

            <div className="mx-auto max-w-4xl space-y-8">

                {/* Header */}

                <div>

                    <h1 className="text-4xl font-black text-white">
                        ⚙️ Settings
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Manage your CapitalMind preferences and account settings.
                    </p>

                </div>


                {/* Market Preference */}

                <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

                    <div className="mb-6">

                        <h2 className="text-xl font-bold text-white">
                            📊 Market Preference
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            Choose the market you want to use as your default.
                        </p>

                    </div>


                    <div className="grid gap-4 sm:grid-cols-2">

                        <button
                            type="button"
                            onClick={() =>
                                handleMarketChange("INDIA")
                            }
                            className={`rounded-xl border p-5 text-left transition ${
                                settings.defaultMarket === "INDIA"
                                    ? "border-indigo-500 bg-indigo-500/10"
                                    : "border-slate-700 bg-slate-950/40 hover:border-slate-600"
                            }`}
                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <div className="text-lg font-bold text-white">
                                        🇮🇳 India
                                    </div>

                                    <div className="mt-1 text-sm text-slate-400">
                                        NSE / BSE
                                    </div>

                                </div>

                                {settings.defaultMarket === "INDIA" && (
                                    <span className="text-indigo-400">
                                        ✓
                                    </span>
                                )}

                            </div>

                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                handleMarketChange("USA")
                            }
                            className={`rounded-xl border p-5 text-left transition ${
                                settings.defaultMarket === "USA"
                                    ? "border-indigo-500 bg-indigo-500/10"
                                    : "border-slate-700 bg-slate-950/40 hover:border-slate-600"
                            }`}
                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <div className="text-lg font-bold text-white">
                                        🇺🇸 United States
                                    </div>

                                    <div className="mt-1 text-sm text-slate-400">
                                        NYSE / NASDAQ
                                    </div>

                                </div>

                                {settings.defaultMarket === "USA" && (
                                    <span className="text-indigo-400">
                                        ✓
                                    </span>
                                )}

                            </div>

                        </button>

                    </div>

                </section>


                {/* Notifications */}

                <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

                    <div className="mb-6">

                        <h2 className="text-xl font-bold text-white">
                            🔔 Notifications
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            Control how CapitalMind keeps you informed.
                        </p>

                    </div>


                    <div className="space-y-5">

                        <SettingToggle
                            title="App Notifications"
                            description="Receive notifications about important activity in CapitalMind."
                            enabled={settings.notifications}
                            onChange={() =>
                                handleToggle("notifications")
                            }
                        />

                        <SettingToggle
                            title="Email Notifications"
                            description="Receive important CapitalMind updates by email."
                            enabled={settings.emailNotifications}
                            onChange={() =>
                                handleToggle("emailNotifications")
                            }
                        />

                    </div>

                </section>


                {/* Account */}

                <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

                    <div className="mb-6">

                        <h2 className="text-xl font-bold text-white">
                            👤 Account
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            Manage your current CapitalMind session.
                        </p>

                    </div>


                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <p className="font-semibold text-white">
                                Signed in as
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                {user?.email || "Unknown user"}
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={logout}
                            className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500/20"
                        >
                            Logout
                        </button>

                    </div>

                </section>


                {/* Save */}

                <div className="flex justify-end">

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="rounded-xl bg-indigo-600 px-7 py-3 font-bold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        {saving
                            ? "Saving..."
                            : "Save Settings"}

                    </button>

                </div>

            </div>

        </AppLayout>

    );
}


function SettingToggle({
    title,
    description,
    enabled,
    onChange
}) {

    return (

        <div className="flex items-center justify-between gap-6">

            <div>

                <h3 className="font-semibold text-white">
                    {title}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                    {description}
                </p>

            </div>


            <button
                type="button"
                role="switch"
                aria-checked={enabled}
                onClick={onChange}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                    enabled
                        ? "bg-indigo-600"
                        : "bg-slate-700"
                }`}
            >

                <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                        enabled
                            ? "left-6"
                            : "left-1"
                    }`}
                />

            </button>

        </div>

    );
}