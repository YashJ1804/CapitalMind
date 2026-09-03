import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {

        const storedUser = localStorage.getItem("user");

        return storedUser ? JSON.parse(storedUser) : null;

    });

    const [token, setToken] = useState(() => {

        return localStorage.getItem("token");

    });

    const login = (userData, tokenData) => {

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        localStorage.setItem(
            "token",
            tokenData
        );

        setUser(userData);

        setToken(tokenData);

    };

    const updateUser = (updatedUser) => {

        setUser((currentUser) => {

            const nextUser = {
                ...currentUser,
                ...updatedUser
            };

            localStorage.setItem(
                "user",
                JSON.stringify(nextUser)
            );

            return nextUser;

        });

    };

    const logout = () => {

        localStorage.removeItem("user");

        localStorage.removeItem("token");

        setUser(null);

        setToken(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                updateUser,
                isAuthenticated: !!token
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {

        throw new Error(
            "useAuth must be used inside AuthProvider"
        );

    }

    return context;

}