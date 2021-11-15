import React, { useState, useContext, useEffect } from "react";
import { Context } from "../AuthContext";

function Registro() {
    const [registros, setRegistros] = useState([]);
    const [vacinas, setVacinas] = useState([]);
    const [data, setData] = useState("");
    const [idVacina, setVacina] = useState(1);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(12);
    const [showModal, setModalValue] = useState(false);

    const [modalDataValores, setModalDataValores] = useState({
        idregistro: "",
        idvacina: "",
    });

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

    const handle = async (e) => {
        e.preventDefault();
        await createRegistro(idVacina, data);
        retrieveRegistros();
        retrieveVacinas();
    };

    const limpar = (e) => {
        e.preventDefault();
        setVacina(1);
        setData("");
    };

    const remover = async (e, id) => {
        e.preventDefault();
        await removerRegistro(id);
        retrieveVacinas();
        retrieveRegistros();
    };

    const editar = async (e) => {
        e.preventDefault();
        await updateRegistro(
            modalDataValores.idregistro,
            modalDataValores.idvacina,
            data
        );
        retrieveRegistros();
    };

    const ativarModal = (e, idregistro, idvacina) => {
        e.preventDefault();
        setModalDataValores({ idregistro: idregistro, idvacina: idvacina });
        setModalValue(true);
    };

    const desativarModal = (e) => {
        e.preventDefault();
        setModalValue(false);
        setModalDataValores({
            idregistro: "",
            idvacina: "",
        });
        setData("");
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
            <div
                class="Modal"
                style={{
                    visibility: showModal ? "visible" : "hidden",
                }}
            >
                <div class="ModalClose" onClick={(e) => desativarModal(e)}>
                    x
                </div>
                <h4>
                    Editar Data do registro ID: {modalDataValores.idregistro}
                </h4>
                <input
                    type="text"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                ></input>
                <button onClick={(e) => editar(e)}>Editar</button>
            </div>

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
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {registros !== undefined &&
                        registros.map((item, index) => (
                            <tr>
                                <td>{item.idregistro}</td>
                                <td>{item.vacina.nome}</td>
                                <td>{item.data}</td>
                                <td>
                                    <button
                                        onClick={(e) =>
                                            ativarModal(
                                                e,
                                                item.idregistro,
                                                item.idvacina
                                            )
                                        }
                                    >
                                        Editar data
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={(e) =>
                                            remover(e, item.idregistro)
                                        }
                                    >
                                        Excluir
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
