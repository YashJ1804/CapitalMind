import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import Watchlist from "./pages/Watchlist";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";

function ProtectedRoute({ children }) {

    const { isAuthenticated } = useAuth();

    return isAuthenticated

        ? children

        : <Navigate to="/login" replace/>;

}

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route

                    path="/"

                    element={

                        <ProtectedRoute>

                            <Home />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/login"

                    element={<Login />}

                />

                <Route

                    path="/register"

                    element={<Register />}

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
<Route

    path="/dashboard"

    element={<Dashboard />}

/>

            </Routes>

        </BrowserRouter>

    );

}

export default App;