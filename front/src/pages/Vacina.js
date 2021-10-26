import React, { useState, useContext, useEffect } from "react";
import { Context } from "../AuthContext";

function Vacina() {
    const { listVacinas, createVacina, removerVacina, updateVacina } =
        useContext(Context);
    const [vacinas, setVacinas] = useState([]);
    const [nome, setNome] = useState("");

    useEffect(() => {
        retrieveVacinas();
    }, []);

    const retrieveVacinas = async () => {
        const data = await listVacinas(0, 4);
        setVacinas(data);
    };

    const remover = (e, id) => {
        e.preventDefault();
        removerVacina(id);
        setTimeout(() => retrieveVacinas(), 100);
    };

    const handle = (e) => {
        e.preventDefault();
        createVacina(nome);
        setTimeout(() => retrieveVacinas(), 100);
    };

    const limpar = (e) => {
        e.preventDefault();
        setNome("");
    };

    const editar = (e, id) => {
        e.preventDefault();
        const newname = prompt("Digite um novo nome");
        updateVacina(id, newname);
        setTimeout(() => retrieveVacinas(), 100);
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
