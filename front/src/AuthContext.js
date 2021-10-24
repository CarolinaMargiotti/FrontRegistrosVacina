import React, { createContext } from "react";
import hooks from "./hooks";

const Context = createContext();

function AuthProvider({ children }) {
    const {
        login,
        logout,
        logado,
        isLoading,
        perfil,
        createRegistro,
        removerRegistro,
        registros,
        vacinas,
        createVacina,
        removerVacina,
        updateVacina,
        updateRegistro,
    } = hooks();
    return (
        <Context.Provider
            value={{
                login,
                logout,
                logado,
                isLoading,
                perfil,
                createRegistro,
                removerRegistro,
                registros,
                vacinas,
                createVacina,
                removerVacina,
                updateVacina,
                updateRegistro,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };
