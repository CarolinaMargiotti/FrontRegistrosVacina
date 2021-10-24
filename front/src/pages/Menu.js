import React, { useContext } from "react";
import { Context } from "../AuthContext";
import history from "../history";

function Menu() {
    const { logout, logado, perfil } = useContext(Context);
    return (
        <div>
            <h4>Cadastro de vacinas</h4>
            {logado && (
                <div>
                    <button onClick={() => logout()}>Logout</button>
                    <button onClick={() => history.push("/registro")}>
                        Registro
                    </button>
                    <button>Seus dados</button>
                    {perfil === "admin" && (
                        <>
                            <button onClick={() => history.push("/perfil")}>
                                Perfil
                            </button>
                            <button onClick={() => history.push("/vacina")}>
                                Vacina
                            </button>
                        </>
                    )}
                </div>
            )}
            {!logado && (
                <button onClick={() => history.push("/login")}>Login</button>
            )}
        </div>
    );
}

export default Menu;
