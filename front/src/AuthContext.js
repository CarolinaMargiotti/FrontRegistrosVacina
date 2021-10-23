import React, { createContext } from "react";
import hooks from "./hooks";

const Context = createContext();

function AuthProvider({ children }) {
    const { login, logout, logado, isLoading } = hooks();
    return (
        <Context.Provider value={{ login, logout, logado, isLoading }}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };
