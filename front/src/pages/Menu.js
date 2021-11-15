import React, { useContext } from "react";
import { Context } from "../AuthContext";
import history from "../history";

function Menu() {
    const { logout, logado, perfil } = useContext(Context);
    return (
        <div>
            <div id="header">
                <h4 id="logo">Cadastro de vacinas</h4>
                {logado && (
                    <div>
                        <button onClick={() => history.push("/registro")}>
                            Registro
                        </button>

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
                        <button onClick={() => history.push("/seusdados")}>
                            Seus dados
                        </button>
                        <button onClick={() => logout()}>Logout</button>
                    </div>
                )}
                {!logado && (
                    <div>
                        <button onClick={() => history.push("/login")}>
                            Login
                        </button>
                        <button onClick={() => history.push("/cadastro")}>
                            Criar conta
                        </button>
                    </div>
                )}
            </div>
            <hr />
        </div>
    );
}

export default Menu;
