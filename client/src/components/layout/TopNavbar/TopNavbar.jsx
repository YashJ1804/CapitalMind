import { useEffect, useRef, useState } from "react";
import {
    Search,
    Bell,
    UserCircle,
    Check,
    CheckCheck,
    Trash2,
    X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

export default function TopNavbar() {
    const navigate = useNavigate();

    const [company, setCompany] = useState("");

    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
    const [loadingNotifications, setLoadingNotifications] = useState(false);

    const notificationRef = useRef(null);

    const handleSearch = (e) => {
        if (e.key !== "Enter") {
            return;
        }

        if (!company.trim()) {
            return;
        }

        navigate(
            `/analyze?company=${encodeURIComponent(company.trim())}`
        );
    };

    const fetchUnreadCount = async () => {
        try {
            const response = await api.get(
                "/notifications/unread-count"
            );

            setUnreadCount(
                response.data?.data?.count || 0
            );
        } catch (error) {
            console.error(
                "Failed to fetch unread notification count:",
                error
            );
        }
    };

    const fetchNotifications = async () => {
        try {
            setLoadingNotifications(true);

            const response = await api.get(
                "/notifications"
            );

            setNotifications(
                response.data?.data || []
            );

            await fetchUnreadCount();
        } catch (error) {
            console.error(
                "Failed to fetch notifications:",
                error
            );
        } finally {
            setLoadingNotifications(false);
        }
    };

    const toggleNotifications = async () => {
        const nextState = !showNotifications;

        setShowNotifications(nextState);

        if (nextState) {
            await fetchNotifications();
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await api.put(
                `/notifications/${notificationId}/read`
            );

            setNotifications((current) =>
                current.map((notification) =>
                    notification._id === notificationId
                        ? {
                              ...notification,
                              isRead: true
                          }
                        : notification
                )
            );

            setUnreadCount((current) =>
                Math.max(0, current - 1)
            );
        } catch (error) {
            console.error(
                "Failed to mark notification as read:",
                error
            );
        }
    };

    const markAllAsRead = async () => {
        try {
            await api.put(
                "/notifications/read-all"
            );

            setNotifications((current) =>
                current.map((notification) => ({
                    ...notification,
                    isRead: true
                }))
            );

            setUnreadCount(0);
        } catch (error) {
            console.error(
                "Failed to mark all notifications as read:",
                error
            );
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            const notification =
                notifications.find(
                    (item) =>
                        item._id === notificationId
                );

            await api.delete(
                `/notifications/${notificationId}`
            );

            setNotifications((current) =>
                current.filter(
                    (item) =>
                        item._id !== notificationId
                )
            );

            if (notification && !notification.isRead) {
                setUnreadCount((current) =>
                    Math.max(0, current - 1)
                );
            }
        } catch (error) {
            console.error(
                "Failed to delete notification:",
                error
            );
        }
    };

    useEffect(() => {
        fetchUnreadCount();

        const interval = setInterval(() => {
            fetchUnreadCount();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setShowNotifications(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const formatNotificationTime = (date) => {
        if (!date) {
            return "";
        }

        const createdAt = new Date(date);
        const now = new Date();

        const difference =
            Math.floor(
                (now.getTime() - createdAt.getTime()) /
                    1000
            );

        if (difference < 60) {
            return "Just now";
        }

        if (difference < 3600) {
            return `${Math.floor(
                difference / 60
            )}m ago`;
        }

        if (difference < 86400) {
            return `${Math.floor(
                difference / 3600
            )}h ago`;
        }

        if (difference < 604800) {
            return `${Math.floor(
                difference / 86400
            )}d ago`;
        }

        return createdAt.toLocaleDateString();
    };

    return (
        <header className="relative z-30 flex shrink-0 items-center justify-between gap-3 border-b border-slate-800 bg-slate-950 px-4 py-3 sm:px-6 sm:py-4 lg:px-6 lg:py-5">

            {/* Left Section */}

            <div className="min-w-0">
                <h1 className="truncate text-lg font-bold text-white sm:text-xl lg:text-2xl">
                    Dashboard
                </h1>

                <p className="mt-1 hidden text-sm text-slate-400 sm:block">
                    Welcome back! Here's what's happening today.
                </p>
            </div>

            {/* Right Section */}

            <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-4">

                {/* Search */}

                <div className="hidden items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 sm:flex lg:px-4">

                    <Search
                        size={18}
                        className="shrink-0 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search company..."
                        value={company}
                        onChange={(e) =>
                            setCompany(e.target.value)
                        }
                        onKeyDown={handleSearch}
                        className="w-32 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none md:w-44 lg:w-56"
                    />

                </div>

                {/* Mobile Search */}

                <button
                    type="button"
                    onClick={() => navigate("/analyze")}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-cyan-500 hover:text-white sm:hidden"
                    aria-label="Search companies"
                >
                    <Search size={19} />
                </button>

                {/* Notification */}

                <div
                    ref={notificationRef}
                    className="relative"
                >

                    <button
                        type="button"
                        onClick={toggleNotifications}
                        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-cyan-500 hover:text-white sm:h-11 sm:w-11"
                        aria-label="Notifications"
                    >

                        <Bell size={19} className="sm:h-5 sm:w-5" />

                        {unreadCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                                {unreadCount > 99
                                    ? "99+"
                                    : unreadCount}
                            </span>
                        )}

                    </button>

                    {/* Notification Panel */}

                    {showNotifications && (
                        <div className="fixed left-3 right-3 top-[4.5rem] z-[60] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-14 sm:w-96">

                            {/* Header */}

                            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-4">

                                <div className="min-w-0">
                                    <h2 className="font-semibold text-white">
                                        Notifications
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        {unreadCount > 0
                                            ? `${unreadCount} unread`
                                            : "You're all caught up"}
                                    </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-1">

                                    {unreadCount > 0 && (
                                        <button
                                            type="button"
                                            onClick={markAllAsRead}
                                            title="Mark all as read"
                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-400"
                                        >
                                            <CheckCheck
                                                size={17}
                                            />
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowNotifications(false)
                                        }
                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                                        aria-label="Close notifications"
                                    >
                                        <X size={17} />
                                    </button>

                                </div>

                            </div>

                            {/* Notifications */}

                            <div className="max-h-[min(420px,calc(100vh-7rem))] overflow-y-auto">

                                {loadingNotifications ? (
                                    <div className="px-4 py-10 text-center text-sm text-slate-500">
                                        Loading notifications...
                                    </div>
                                ) : notifications.length === 0 ? (
                                    <div className="px-4 py-10 text-center">

                                        <Bell
                                            size={30}
                                            className="mx-auto text-slate-700"
                                        />

                                        <p className="mt-3 text-sm text-slate-400">
                                            No notifications yet.
                                        </p>

                                    </div>
                                ) : (
                                    notifications.map(
                                        (notification) => (
                                            <div
                                                key={
                                                    notification._id
                                                }
                                                className={`border-b border-slate-800 px-4 py-4 transition ${
                                                    notification.isRead
                                                        ? "bg-slate-900"
                                                        : "bg-slate-800/60"
                                                }`}
                                            >

                                                <div className="flex gap-3">

                                                    <div
                                                        className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                                                            notification.isRead
                                                                ? "bg-slate-800 text-slate-500"
                                                                : "bg-cyan-500/10 text-cyan-400"
                                                        }`}
                                                    >
                                                        <Bell
                                                            size={15}
                                                        />
                                                    </div>

                                                    <div className="min-w-0 flex-1">

                                                        <div className="flex items-start justify-between gap-2">

                                                            <h3 className="min-w-0 text-sm font-semibold text-white">
                                                                {
                                                                    notification.title
                                                                }
                                                            </h3>

                                                            {!notification.isRead && (
                                                                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                                                            )}

                                                        </div>

                                                        <p className="mt-1 break-words text-sm leading-5 text-slate-400">
                                                            {
                                                                notification.message
                                                            }
                                                        </p>

                                                        <div className="mt-3 flex items-center justify-between gap-2">

                                                            <span className="text-xs text-slate-600">
                                                                {formatNotificationTime(
                                                                    notification.createdAt
                                                                )}
                                                            </span>

                                                            <div className="flex shrink-0 items-center gap-1">

                                                                {!notification.isRead && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            markAsRead(
                                                                                notification._id
                                                                            )
                                                                        }
                                                                        title="Mark as read"
                                                                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-cyan-400"
                                                                    >
                                                                        <Check
                                                                            size={
                                                                                15
                                                                            }
                                                                        />
                                                                    </button>
                                                                )}

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        deleteNotification(
                                                                            notification._id
                                                                        )
                                                                    }
                                                                    title="Delete"
                                                                    className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-red-400"
                                                                >
                                                                    <Trash2
                                                                        size={
                                                                            15
                                                                        }
                                                                    />
                                                                </button>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                        )
                                    )
                                )}

                            </div>

                        </div>
                    )}

                </div>

                {/* User */}

                <button
                    type="button"
                    className="flex h-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-2 text-slate-300 transition hover:border-cyan-500 sm:h-11 sm:px-3 lg:gap-3 lg:px-4"
                >

                    <UserCircle
                        size={24}
                        className="text-cyan-400 lg:h-7 lg:w-7"
                    />

                    <div className="hidden text-left lg:block">

                        <p className="text-sm font-medium text-white">
                            Welcome
                        </p>

                        <p className="text-xs text-slate-400">
                            Investor
                        </p>

                    </div>

                </button>

            </div>

        </header>
    );
}