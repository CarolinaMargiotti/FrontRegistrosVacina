import React, { useState, useContext } from "react";
import { Context } from "../AuthContext";
function Vacina() {
    const { vacinas, createVacina, removerVacina, updateVacina } =
        useContext(Context);
    const [nome, setNome] = useState("");

    const remover = (e, id) => {
        e.preventDefault();
        removerVacina(id);
    };

    const handle = (e) => {
        e.preventDefault();
        createVacina(nome);
    };

    const limpar = (e) => {
        e.preventDefault();
        setNome("");
    };

    const editar = (e, id) => {
        e.preventDefault();
        const newname = prompt("Digite um novo nome");
        updateVacina(id, newname);
    };

    return (
        <div>
            <h4>Vacina</h4>
            <div>
                <label>Nome</label>
                <input
                    value={nome}
                    type="text"
                    onChange={(e) => setNome(e.target.value)}
                ></input>
            </div>
            <button onClick={(e) => handle(e)}>Criar</button>
            <button onClick={(e) => limpar(e)}>Limpar</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vacina</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {vacinas !== undefined &&
                        vacinas.map((item, index) => (
                            <tr
                                onContextMenu={(e) => remover(e, item.idvacina)}
                            >
                                <td>{item.idvacina}</td>
                                <td>{item.nome}</td>
                                <td>
                                    <button
                                        onClick={(e) =>
                                            editar(e, item.idvacina)
                                        }
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Vacina;
