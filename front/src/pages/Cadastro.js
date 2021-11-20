import React, { useContext, useState } from "react";
import { Button, Input, FormGroup, Label, Form } from "reactstrap";

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
            <h4 className="mt-3 mb-3">Cadastro</h4>
            <Form>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        type="text"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    ></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Senha</Label>
                    <Input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    ></Input>
                </FormGroup>
                <FormGroup>
                    <Button color="success" onClick={(e) => handle(e)}>
                        Criar
                    </Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default Cadastro;
