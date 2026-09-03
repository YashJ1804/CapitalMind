import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Watchlist from "./pages/Watchlist";

import Portfolio from "./pages/Portfolio";
import Market from "./pages/Market";
import Analyze from "./pages/Analyze";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import HistoricalAnalysis from "./pages/HistoricalAnalysis";

import { useAuth } from "./context/AuthContext";


function ProtectedRoute({ children }) {

    const { isAuthenticated } = useAuth();

    return isAuthenticated
        ? children
        : <Navigate to="/login" replace />;

}


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ================= PUBLIC ROUTES ================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* ================= PROTECTED ROUTES ================= */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <History />
                        </ProtectedRoute>
                    }
                />


                {/* Historical Analysis */}

                <Route
                    path="/history/:id"
                    element={
                        <ProtectedRoute>
                            <HistoricalAnalysis />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/watchlist"
                    element={
                        <ProtectedRoute>
                            <Watchlist />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/portfolio"
                    element={
                        <ProtectedRoute>
                            <Portfolio />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/market"
                    element={
                        <ProtectedRoute>
                            <Market />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/analyze"
                    element={
                        <ProtectedRoute>
                            <Analyze />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />


                {/* ================= 404 ================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;