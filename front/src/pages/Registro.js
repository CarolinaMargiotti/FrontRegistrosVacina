import React, { useState, useContext, useEffect } from "react";
import { Context } from "../AuthContext";

function Registro() {
    const [registros, setRegistros] = useState([]);
    const [vacinas, setVacinas] = useState([]);
    const [data, setData] = useState("");
    const [idVacina, setVacina] = useState(1);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(4);
    //pagina de registro
    const {
        createRegistro,
        listRegistros,
        listVacinas,
        removerRegistro,
        updateRegistro,
    } = useContext(Context);

    const retrieveRegistros = async () => {
        const data = await listRegistros(offset, limit);
        if (data.length === 0) {
            setOffset(Math.max(offset - limit, 0));
        } else setRegistros(data);
    };

    const retrieveVacinas = async () => {
        const data = await listVacinas();
        setVacinas(data);
    };

    useEffect(() => {
        retrieveRegistros();
        retrieveVacinas();
    }, [offset]);

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
        updateRegistro(idregistro, idvacina, newdata);
        setTimeout(() => retrieveRegistros(), 100);
    };

    const anterior = (e) => {
        e.preventDefault();
        const newOffset = Math.max(offset - limit, 0);
        setOffset(newOffset);
    };

    const proximo = (e) => {
        e.preventDefault();
        const newOffset = offset + limit;
        setOffset(newOffset);
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
            <div>
                <button onClick={(e) => anterior(e)}>Anterior</button>
                <button onClick={(e) => proximo(e)}>Próximo</button>
            </div>
        </div>
    );
}

export default Registro;
