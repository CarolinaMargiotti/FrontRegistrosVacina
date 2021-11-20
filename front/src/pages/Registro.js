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
    Toast,
    ToastHeader,
    ToastBody,
} from "reactstrap";

function Registro() {
    const [registros, setRegistros] = useState([]);
    const [vacinas, setVacinas] = useState([]);
    const [data, setData] = useState("");
    const [newData, setNewData] = useState("");
    const [idVacina, setVacina] = useState(1);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(12);
    const [showModal, setModalValue] = useState(false);
    const [showToast, setShowToast] = useState(false);

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
        ativarToast();
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
            newData
        );
        retrieveRegistros();
        desativarModal(e);
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
        setNewData("");
    };

    const ativarToast = () => {
        setShowToast(true);
        // setTimeout(() => setShowToast(false), 3000);
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
                <ModalHeader>Editar Data</ModalHeader>
                <ModalBody>
                    <Label>
                        Editar data do registro: {modalDataValores.idregistro}
                    </Label>
                    <br />
                    <Input
                        type="text"
                        value={newData}
                        onChange={(e) => setNewData(e.target.value)}
                        placeholder="Digite como o exemplo: 2021-11-20"
                    ></Input>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={(e) => editar(e)}>
                        Editar
                    </Button>
                    <Button onClick={(e) => desativarModal(e)}>Cancelar</Button>
                </ModalFooter>
            </Modal>

            <h4 className="mt-3 mb-3">Registro</h4>
            <Form>
                <FormGroup>
                    <Label>Vacina</Label>
                    <Input
                        value={idVacina}
                        type="select"
                        onChange={(e) => setVacina(e.target.value)}
                    >
                        {vacinas !== undefined &&
                            vacinas.map((item, index) => (
                                <option value={item.idvacina}>
                                    {item.nome}
                                </option>
                            ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Data (Ano-Mês-Dia)</Label>
                    <Input
                        type="text"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        placeholder="Digite como o exemplo: 2021-11-20"
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
                                    <Button
                                        color="success"
                                        size="sm"
                                        onClick={(e) =>
                                            ativarModal(
                                                e,
                                                item.idregistro,
                                                item.idvacina
                                            )
                                        }
                                    >
                                        Editar data
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        color="success"
                                        size="sm"
                                        onClick={(e) =>
                                            remover(e, item.idregistro)
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

export default Registro;
