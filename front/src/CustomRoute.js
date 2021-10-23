import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "./AuthContext";

const CustomRoute = ({ isPrivate, ...rest }) => {
    const { logado, isLoading } = useContext(Context);

    if (isLoading) {
        console.log("Lendo o storage destino: ", rest.path);
        return <h3>Carregando</h3>;
    }

    if (isPrivate && !logado) {
        return <Redirect to="/login" />;
    }

    console.log("Component renderizado: ", rest.path);
    return <Route {...rest} />;
};

export default CustomRoute;
