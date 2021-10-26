import React, { useState, useContext, useEffect } from "react";
import { Context } from "../AuthContext";

function Registro() {
    const [registros, setRegistros] = useState([]);
    const [vacinas, setVacinas] = useState([]);
    const [data, setData] = useState("");
    const [idVacina, setVacina] = useState(1);
    const {
        createRegistro,
        listRegistros,
        listVacinas,
        removerRegistro,
        updateRegistro,
    } = useContext(Context);

    const retrieveRegistros = async () => {
        const data = await listRegistros(0, 4);
        setRegistros(data);
    };

    const retrieveVacinas = async () => {
        const data = await listVacinas(0, 4);
        setVacinas(data);
    };

    useEffect(() => {
        retrieveRegistros();
        retrieveVacinas();
    }, []);
    const handle = (e) => {
        e.preventDefault();
        createRegistro(idVacina, data);
        setTimeout(() => retrieveVacinas(), 100);
        setTimeout(() => retrieveRegistros(), 100);
    };

    const limpar = (e) => {
        e.preventDefault();
        setVacina(1);
        setData("");
    };

    const remover = (e, id) => {
        e.preventDefault();
        removerRegistro(id);
        setTimeout(() => retrieveVacinas(), 100);
        setTimeout(() => retrieveRegistros(), 100);
    };

    const editar = (e, idregistro, idvacina) => {
        e.preventDefault();
        const newdata = prompt("Digite uma nova data");
        console.log(idregistro);
        console.log(idvacina);
        console.log(newdata);
        updateRegistro(idregistro, idvacina, newdata);
        setTimeout(() => retrieveRegistros(), 100);
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
