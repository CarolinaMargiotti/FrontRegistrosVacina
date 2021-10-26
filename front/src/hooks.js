import { useState, useEffect } from "react";
import history from "./history";
import api from "./api";

const Hooks = () => {
    const [logado, setLogado] = useState(false);
    const [perfil, setPerfil] = useState("");
    const [mail, setMail] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    //chamado após montar componente

    useEffect(() => {
        const storageToken = localStorage.getItem("@token");
        let storagePerfil = localStorage.getItem("@perfil");
        let storageMail = localStorage.getItem("@mail");

        if (storageToken) {
            const token = JSON.parse(storageToken);
            const perfil = JSON.parse(storagePerfil);
            const mail = JSON.parse(storageMail);
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setLogado(true);
            setPerfil(perfil);
            setMail(mail);
        }
        setIsLoading(false);
        console.log("Storage. Token:", storageToken);
    }, []);

    //LOGIN

    const login = async (mail, senha) => {
        try {
            console.log(mail, senha);
            const { data } = await api.post("/usuario/login", {
                mail,
                senha,
            });
            console.log(data);
            localStorage.setItem("@token", JSON.stringify(data.token));
            localStorage.setItem("@perfil", JSON.stringify(data.perfil));
            localStorage.setItem("@mail", JSON.stringify(data.mail));
            api.defaults.headers.Authorization = `Bearer ${data.token}`;
            setLogado(true);
            setPerfil(data.perfil);
            setMail(data.mail);
            history.push("/registro");
        } catch (e) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const logout = () => {
        setLogado(false);
        setPerfil("");
        setMail("");
        localStorage.removeItem("@token");
        localStorage.removeItem("@perfil");
        localStorage.removeItem("@mail");
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
        } catch (e) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const listRegistros = async (offset, limit) => {
        try {
            const { data } = await api.get("/registro/list", {
                offset: offset,
                limit: limit,
            });
            return data.registros;
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
            return data.vacinas;
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
        } catch (e) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const removerVacina = async (idvacina) => {
        try {
            await api.delete("/vacina/remove", {
                method: "delete",
                params: {
                    idvacina,
                },
            });
        } catch (e) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    //USUARIO
    const createUsuario = async (mail, senha, perfil) => {
        try {
            await api.post("/usuario/create", {
                mail,
                senha,
            });
        } catch (e) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const updatePerfil = async (idusuario, perfil) => {
        try {
            await api.put("usuario/update/perfil", {
                idusuario,
                perfil,
            });
        } catch (e) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const updateMail = async (mail) => {
        try {
            await api.put("/usuario/update/mail", { mail });
            setMail(mail);
            localStorage.setItem("@mail", mail);
            alert("Email alterado com sucesso");
        } catch (e) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const updateSenha = async (senha) => {
        try {
            await api.put("usuario/update/senha", { senha });
            alert("Senha alterado com sucesso");
        } catch (e) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const listUsuarios = async (offset, limit) => {
        try {
            const { data } = await api.get("usuario/list", {
                offset,
                limit,
            });
            return data.usuarios;
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
        mail,
        createRegistro,
        removerRegistro,
        createVacina,
        removerVacina,
        updateVacina,
        updateRegistro,
        updateMail,
        updateSenha,
        listUsuarios,
        listVacinas,
        listRegistros,
        createUsuario,
        updatePerfil,
    };
};

export default Hooks;
