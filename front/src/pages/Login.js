import React, { useState, useContext } from "react";
import { Context } from "../AuthContext";

function Login() {
    const [mail, setMail] = useState("");
    const [senha, setSenha] = useState("");
    const { login } = useContext(Context);

    const handle = (e) => {
        e.preventDefault();
        login(mail, senha);
    };

    return (
        <div>
            <h4>Login</h4>
            <div>
                <label>E-mail</label>
                <input value={mail} onChange={(e) => setMail(e.target.value)} />
            </div>
            <div>
                <label>Senha</label>
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>
            <div>
                <button onClick={(e) => handle(e)}>Logar</button>
            </div>
        </div>
    );
}

export default Login;
