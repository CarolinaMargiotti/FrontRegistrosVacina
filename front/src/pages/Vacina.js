import React, { useState, useContext, useEffect } from "react";
import { Context } from "../AuthContext";
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
    Input,
    Table,
    Form,
    FormGroup,
    Container,
    Label,
} from "reactstrap";

function Vacina() {
    const { listVacinas, createVacina, removerVacina, updateVacina } =
        useContext(Context);
    const [vacinas, setVacinas] = useState([]);
    const [nome, setNome] = useState("");
    const [newNome, setNewNome] = useState("");
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
        await updateVacina(modalDataValores.idvacina, newNome);
        retrieveVacinas();
        desativarModal(e);
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
        setNewNome("");
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
            <Modal isOpen={showModal}>
                <ModalHeader>Editar Nome</ModalHeader>
                <ModalBody>
                    <Label>
                        Editar nome da vacina: {modalDataValores.idvacina}
                    </Label>
                    <Input
                        type="text"
                        value={newNome}
                        onChange={(e) => setNewNome(e.target.value)}
                    ></Input>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={(e) => editar(e)}>
                        Editar
                    </Button>
                    <Button onClick={(e) => desativarModal(e)}>Cancelar</Button>
                </ModalFooter>
            </Modal>

            <h4 className="mt-3 mb-3">Vacina</h4>
            <Form>
                <FormGroup>
                    <Label>Nome</Label>
                    <Input
                        value={nome}
                        type="text"
                        onChange={(e) => setNome(e.target.value)}
                    ></Input>
                </FormGroup>
                <FormGroup>
                    <Container>
                        <div className="row">
                            <Button
                                className="col col-auto"
                                color="success"
                                size="sm"
                                onClick={(e) => handle(e)}
                            >
                                Criar
                            </Button>
                            <div className="col col-auto" />
                            <Button
                                className="col col-auto"
                                color="success"
                                size="sm"
                                onClick={(e) => limpar(e)}
                            >
                                Limpar
                            </Button>
                        </div>
                    </Container>
                </FormGroup>
            </Form>
            <Table
                striped
                className="border border-1 border-success table-hover"
            >
                <thead className="bg-success text-white">
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
                                    <Button
                                        color="success"
                                        size="sm"
                                        onClick={(e) =>
                                            ativarModal(e, item.idvacina)
                                        }
                                    >
                                        Editar
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        color="success"
                                        size="sm"
                                        onClick={(e) =>
                                            remover(e, item.idvacina)
                                        }
                                    >
                                        Excluir
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

export default Vacina;
