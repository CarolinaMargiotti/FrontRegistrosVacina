import React, { useContext, useEffect, useState } from "react";

import { Context } from "../AuthContext";

import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
    Input,
    Table,
    FormGroup,
    Container,
    Label,
} from "reactstrap";

function Perfil() {
    const { listUsuarios, updatePerfil } = useContext(Context);
    const [usuarios, setUsuarios] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(12);
    const [showModal, setModalValue] = useState(false);
    const [newPerfil, setNewPerfil] = useState("user");

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
        await updatePerfil(modalDataValores.idusuario, newPerfil);
        retrieveUsuarios();
        desativarModal(e);
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
        setNewPerfil("user");
    };

    return (
        <div>
            <Modal isOpen={showModal}>
                <ModalHeader>Editar Perfil</ModalHeader>
                <ModalBody>
                    <Label>
                        Editar perfil do usuario: {modalDataValores.idusuario}
                    </Label>
                    <Input
                        type="select"
                        value={newPerfil}
                        onChange={(e) => {
                            setNewPerfil(e.target.value);
                        }}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </Input>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={(e) => editar(e)}>
                        Editar
                    </Button>
                    <Button onClick={(e) => desativarModal(e)}>Cancelar</Button>
                </ModalFooter>
            </Modal>

            <h4 className="mt-3 mb-3">Perfil</h4>
            <Table
                striped
                className="border border-1 border-success table-hover"
            >
                <thead className="bg-success text-white">
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
                                    <Button
                                        color="success"
                                        size="sm"
                                        onClick={(e) =>
                                            ativarModal(e, item.idusuario)
                                        }
                                    >
                                        Editar Perfil
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <FormGroup>
                <Container>
                    <div className="row">
                        <Button
                            className="col col-auto"
                            color="success"
                            size="sm"
                            onClick={(e) => anterior(e)}
                        >
                            Anterior
                        </Button>
                        <div className="col col-auto" />
                        <Button
                            className="col col-auto"
                            color="success"
                            size="sm"
                            onClick={(e) => proximo(e)}
                        >
                            Próximo
                        </Button>
                    </div>
                </Container>
            </FormGroup>
        </div>
    );
}

export default Perfil;
