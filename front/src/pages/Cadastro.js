import React, { useContext, useState } from "react";

import { Context } from "../AuthContext";

function Cadastro() {
    const { createUsuario, login } = useContext(Context);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handle = async (e) => {
        e.preventDefault();
        await createUsuario(email, senha, "user");
        login(email, senha);
    };

    return (
        <div>
            <h4>Cadastro</h4>
            <div>
                <label>Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                ></input>
            </div>
            <div>
                <label>Senha</label>
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                ></input>
            </div>
            <button onClick={(e) => handle(e)}>Criar</button>
        </div>
    );
}

export default Cadastro;
