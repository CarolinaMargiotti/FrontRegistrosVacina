import React, { useContext, useEffect, useState } from "react";
import { Context } from "../AuthContext";
import { Button, Input, FormGroup, Label, Form } from "reactstrap";

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
            <h4 className="mt-3 mb-3">Seus Dados</h4>
            <Form>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        type="text"
                        value={email}
                        onChange={(e) => setMail(e.target.value)}
                    ></Input>
                    <Button
                        className="mt-3"
                        color="success"
                        size="sm"
                        onClick={(e) => {
                            changeEmail(e);
                        }}
                    >
                        Alterar Email
                    </Button>
                </FormGroup>
                <FormGroup>
                    <Label>Senha</Label>
                    <Input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    ></Input>
                    <Button
                        className="mt-3"
                        color="success"
                        size="sm"
                        onClick={(e) => {
                            changeSenha(e);
                        }}
                    >
                        Alterar senha
                    </Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default SeusDados;
