import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "./AuthContext";

const CustomRoute = ({ isPrivate, isAdmin, ...rest }) => {
    const { logado, isLoading, perfil } = useContext(Context);

    if (isLoading) {
        console.log("Lendo o storage destino: ", rest.path);
        return <h3>Carregando</h3>;
    }

    if (isPrivate && !logado) {
        return <Redirect to="/login" />;
    }

    if (isAdmin && perfil !== "admin") {
        return <Redirect to="/registro" />;
    }

    console.log("Componente renderizado: ", rest.path);
    return <Route {...rest} />;
};

export default CustomRoute;
