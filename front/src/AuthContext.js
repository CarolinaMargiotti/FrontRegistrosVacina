import React, { createContext } from "react";
import hooks from "./hooks";

const Context = createContext();

function AuthProvider({ children }) {
    const {
        login,
        logout,
        logado,
        setLogado,
        isLoading,
        perfil,
        mail,
        createRegistro,
        removerRegistro,
        createVacina,
        removerVacina,
        updateVacina,
        updateRegistro,
        updateMail,
        updateSenha,
        listUsuarios,
        listVacinas,
        listRegistros,
        createUsuario,
        updatePerfil,
    } = hooks();
    return (
        <Context.Provider
            value={{
                login,
                logout,
                logado,
                setLogado,
                isLoading,
                perfil,
                mail,
                createRegistro,
                removerRegistro,
                createVacina,
                removerVacina,
                updateVacina,
                updateRegistro,
                updateMail,
                updateSenha,
                listUsuarios,
                listVacinas,
                listRegistros,
                createUsuario,
                updatePerfil,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };
