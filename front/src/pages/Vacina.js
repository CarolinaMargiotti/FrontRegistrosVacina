import React, { useState, useContext, useEffect } from "react";
import { Context } from "../AuthContext";

function Vacina() {
    const { listVacinas, createVacina, removerVacina, updateVacina } =
        useContext(Context);
    const [vacinas, setVacinas] = useState([]);
    const [nome, setNome] = useState("");
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(12);

    const [showModal, setModalValue] = useState(false);
    const [modalDataValores, setModalDataValores] = useState({
        idvacina: "",
    });

    useEffect(() => {
        retrieveVacinas();
    }, [offset]);

    const retrieveVacinas = async () => {
        const data = await listVacinas(offset, limit);
        if (data.length === 0) {
            setOffset(Math.max(offset - limit, 0));
        }
        setVacinas(data);
    };

    const remover = async (e, id) => {
        e.preventDefault();
        await removerVacina(id);
        retrieveVacinas();
    };

    const handle = async (e) => {
        e.preventDefault();
        await createVacina(nome);
        retrieveVacinas();
    };

    const limpar = (e) => {
        e.preventDefault();
        setNome("");
    };

    const editar = async (e) => {
        e.preventDefault();
        await updateVacina(modalDataValores.idvacina, nome);
        retrieveVacinas();
    };

    const ativarModal = (e, idvacina) => {
        e.preventDefault();
        setModalDataValores({ idvacina: idvacina });
        setModalValue(true);
    };

    const desativarModal = (e) => {
        e.preventDefault();
        setModalValue(false);
        setModalDataValores({
            idregistro: "",
            idvacina: "",
        });
        setNome("");
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
                <h4>Editar Nome da vacina ID: {modalDataValores.idvacina}</h4>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                ></input>
                <button onClick={(e) => editar(e)}>Editar</button>
            </div>

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
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {vacinas !== undefined &&
                        vacinas.map((item, index) => (
                            <tr>
                                <td>{item.idvacina}</td>
                                <td>{item.nome}</td>
                                <td>
                                    <button
                                        onClick={(e) =>
                                            ativarModal(e, item.idvacina)
                                        }
                                    >
                                        Editar
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={(e) =>
                                            remover(e, item.idvacina)
                                        }
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <button onClick={(e) => anterior(e)}>Anterior</button>
            <button onClick={(e) => proximo(e)}>Próximo</button>
        </div>
    );
}

export default Vacina;
