import React, { useState, useContext } from "react";
import { Context } from "../AuthContext";
import { Button, Input, FormGroup, Label, Form } from "reactstrap";

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
            <h4 className="mt-3 mb-3">Login</h4>
            <Form>
                <FormGroup>
                    <Label>E-mail</Label>
                    <Input
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Senha</Label>
                    <Input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Button color="success" onClick={(e) => handle(e)}>
                        Logar
                    </Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default Login;
