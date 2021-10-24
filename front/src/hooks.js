import { useState, useEffect } from "react";
import history from "./history";
import api from "./api";

const Hooks = () => {
    const [logado, setLogado] = useState(false);
    const [perfil, setPerfil] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [registros, setRegistros] = useState([]);
    const [vacinas, setVacinas] = useState([]);

    //chamado após montar componente

    useEffect(() => {
        const storageToken = localStorage.getItem("@token");
        let storagePerfil = localStorage.getItem("@perfil");

        if (storagePerfil !== null) {
            storagePerfil = storagePerfil.replace('"', "").replace('"', "");
        }

        if (storageToken) {
            const token = JSON.parse(storageToken);
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setLogado(true);
            setPerfil(storagePerfil);
            listRegistros();
            listVacinas();
        }
        setIsLoading(false);
        console.log("Storage. Token:", storageToken);
    }, []);

    //LOGIN

    const login = async (mail, senha) => {
        try {
            const { data } = await api.post("/usuario/login", {
                mail,
                senha,
            });
            localStorage.setItem("@token", JSON.stringify(data.token));
            localStorage.setItem("@perfil", JSON.stringify(data.perfil));
            api.defaults.headers.Authorization = `Bearer ${data.token}`;
            setLogado(true);
            setPerfil(data.perfil);
            listRegistros();
            listVacinas();
            history.push("/registro");
        } catch (e) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const logout = () => {
        setLogado(false);
        setPerfil("");
        localStorage.removeItem("@token");
        localStorage.removeItem("@perfil");
        api.defaults.headers.Authorization = undefined;
        history.push("/login");
    };

    //REGISTRO

    const createRegistro = async (idvacina, data) => {
        try {
            await api.post("/registro/create", {
                idvacina,
                data,
            });
            await listRegistros();
        } catch (e) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const listRegistros = async (offset, limit) => {
        try {
            const { data } = await api.get("/registro/list", {
                offset,
                limit,
            });
            setRegistros(data.registros);
        } catch (e) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const removerRegistro = async (idregistro) => {
        try {
            await api.delete("/registro/remove", {
                method: "delete",
                params: {
                    idregistro,
                },
            });
            await listRegistros();
        } catch (e) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const updateRegistro = async (idregistro, idvacina, data) => {
        try {
            await api.put("registro/update", {
                idregistro,
                idvacina,
                data,
            });
            await listRegistros();
        } catch (e) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    //VACINA

    const createVacina = async (nome) => {
        try {
            await api.post("/vacina/create", {
                nome,
            });
            await listVacinas();
        } catch (e) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const listVacinas = async (offset, limit) => {
        try {
            const { data } = await api.get("/vacina/list", {
                offset,
                limit,
            });
            setVacinas(data.vacinas);
        } catch (e) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const updateVacina = async (idvacina, nome) => {
        try {
            await api.put("/vacina/update", {
                idvacina,
                nome,
            });
            await listVacinas();
        } catch (e) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const removerVacina = async (idvacina) => {
        try {
            console.log(idvacina);
            await api.delete("/vacina/remove", {
                method: "delete",
                params: {
                    idvacina,
                },
            });
            await listVacinas();
        } catch (e) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    return {
        login,
        logout,
        logado,
        setLogado,
        isLoading,
        perfil,
        createRegistro,
        removerRegistro,
        registros,
        vacinas,
        createVacina,
        removerVacina,
        updateVacina,
        updateRegistro,
    };
};

export default Hooks;
