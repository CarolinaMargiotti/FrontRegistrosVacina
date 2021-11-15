import React, { useContext, useEffect, useState } from "react";

import { Context } from "../AuthContext";

function Perfil() {
    const { listUsuarios, updatePerfil } = useContext(Context);
    const [usuarios, setUsuarios] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(12);
    const [showModal, setModalValue] = useState(false);
    const [perfil, setPerfil] = useState("user");

    const [modalDataValores, setModalDataValores] = useState({
        idusuario: "",
    });

    const retrieveUsuarios = async () => {
        const data = await listUsuarios(offset, limit);
        if (data.length === 0) {
            setOffset(Math.max(offset - limit, 0));
        }
        setUsuarios(data);
    };

    useEffect(() => {
        retrieveUsuarios();
    }, [offset]);

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

    const editar = async (e) => {
        e.preventDefault();
        await updatePerfil(modalDataValores.idusuario, perfil);
        retrieveUsuarios();
    };

    const ativarModal = (e, idusuario) => {
        e.preventDefault();
        setModalDataValores({ idusuario: idusuario });
        setModalValue(true);
    };

    const desativarModal = (e) => {
        e.preventDefault();
        setModalValue(false);
        setModalDataValores({
            idusuario: "",
        });
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
                    Editar Perfil do usuario de ID: {modalDataValores.idusuario}
                </h4>
                <select
                    value={perfil}
                    onChange={(e) => {
                        setPerfil(e.target.value);
                    }}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button onClick={(e) => editar(e)}>Editar</button>
            </div>

            <h4>Perfil</h4>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Perfil</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios !== undefined &&
                            usuarios.map((item, index) => (
                                <tr>
                                    <td>{item.idusuario}</td>
                                    <td>{item.mail}</td>
                                    <td>{item.perfil}</td>
                                    <td>
                                        <button
                                            onClick={(e) =>
                                                ativarModal(e, item.idusuario)
                                            }
                                        >
                                            Editar Perfil
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <button onClick={(e) => anterior(e)}>Anterior</button>
                <button onClick={(e) => proximo(e)}>Próximo</button>
            </div>
        </div>
    );
}

export default Perfil;
