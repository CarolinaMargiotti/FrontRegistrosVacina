import React, { useState, useContext } from "react";
import { Context } from "../AuthContext";

function Registro() {
    const [data, setData] = useState("");
    const [idVacina, setVacina] = useState(1);
    const {
        createRegistro,
        registros,
        vacinas,
        removerRegistro,
        updateRegistro,
    } = useContext(Context);

    const handle = (e) => {
        e.preventDefault();
        createRegistro(idVacina, data);
    };

    const limpar = (e) => {
        e.preventDefault();
        setVacina(1);
        setData("");
    };

    const remover = (e, id) => {
        e.preventDefault();
        removerRegistro(id);
    };

    const editar = (e, idregistro, idvacina) => {
        e.preventDefault();
        const newdata = prompt("Digite uma nova data");
        console.log(idregistro);
        console.log(idvacina);
        console.log(newdata);
        updateRegistro(idregistro, idvacina, newdata);
    };

    return (
        <div>
            <h4>Registro</h4>
            <div>
                <label>Vacina</label>
                <select
                    value={idVacina}
                    onChange={(e) => setVacina(e.target.value)}
                >
                    {vacinas !== undefined &&
                        vacinas.map((item, index) => (
                            <option value={item.idvacina}>{item.nome}</option>
                        ))}
                </select>
            </div>
            <div>
                <label>Data</label>
                <input
                    type="text"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                ></input>
            </div>
            <button onClick={(e) => handle(e)}>Criar</button>
            <button onClick={(e) => limpar(e)}>Limpar</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vacina</th>
                        <th>Data</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {registros !== undefined &&
                        registros.map((item, index) => (
                            <tr
                                onContextMenu={(e) =>
                                    remover(e, item.idregistro)
                                }
                            >
                                <td>{item.idregistro}</td>
                                <td>{item.vacina.nome}</td>
                                <td>{item.data}</td>
                                <td>
                                    <button
                                        onClick={(e) =>
                                            editar(
                                                e,
                                                item.idregistro,
                                                item.idvacina
                                            )
                                        }
                                    >
                                        Editar data
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Registro;
