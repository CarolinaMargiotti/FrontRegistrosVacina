import React, { useContext, useEffect, useState } from "react";
import { Context } from "../AuthContext";

function SeusDados() {
    const { mail, updateMail, updateSenha } = useContext(Context);
    const [email, setMail] = useState("");
    const [senha, setSenha] = useState("");

    useEffect(() => {
        setMail(mail);
    }, [mail]);

    const changeEmail = (e) => {
        e.preventDefault();
        updateMail(email);
    };

    const changeSenha = (e) => {
        e.preventDefault();
        updateSenha(senha);
    };

    return (
        <div>
            <h4>Seus Dados</h4>
            <div>
                <label>Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setMail(e.target.value)}
                ></input>
                <button
                    onClick={(e) => {
                        changeEmail(e);
                    }}
                >
                    Alterar Email
                </button>
            </div>
            <div>
                <label>Senha</label>
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                ></input>
                <button
                    onClick={(e) => {
                        changeSenha(e);
                    }}
                >
                    Alterar senha
                </button>
            </div>
        </div>
    );
}

export default SeusDados;
