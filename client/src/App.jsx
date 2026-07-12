import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import Watchlist from "./pages/Watchlist";
import Dashboard from "./pages/Dashboard";

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

                {/* PUBLIC */}

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

                {/* PROTECTED */}

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

                <Route
                    path="/watchlist"
                    element={
                        <ProtectedRoute>
                            <Watchlist />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;