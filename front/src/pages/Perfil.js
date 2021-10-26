import React, { useContext, useEffect, useState } from "react";

import { Context } from "../AuthContext";

function Perfil() {
    const { listUsuarios, updatePerfil } = useContext(Context);
    const [usuarios, setUsuarios] = useState([]);

    const retrieveUsuarios = async () => {
        const data = await listUsuarios(0, 4);
        setUsuarios(data);
    };

    const editar = (e, id, perfil) => {
        e.preventDefault();
        let res = "";
        let newPerfil = perfil;
        if (perfil === "admin") {
            res = window.confirm("Mudar para user?");
            if (res) newPerfil = "user";
        } else {
            res = window.confirm("Mudar para admin?");
            if (res) newPerfil = "admin";
        }

        if (res) updatePerfil(id, newPerfil);
        setTimeout(() => retrieveUsuarios(), 100);
    };

    useEffect(async () => {
        await retrieveUsuarios();
    }, []);

    return (
        <div>
            <h4>Perfil</h4>
            <div>
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
                                    <tr
                                    // onContextMenu={(e) =>
                                    //     remover(e, item.idregistro)
                                    // }
                                    >
                                        <td>{item.idusuario}</td>
                                        <td>{item.mail}</td>
                                        <td>{item.perfil}</td>
                                        <td>
                                            <button
                                                onClick={(e) =>
                                                    editar(
                                                        e,
                                                        item.idusuario,
                                                        item.perfil
                                                    )
                                                }
                                            >
                                                Editar Perfil
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Perfil;
