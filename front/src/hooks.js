import { useState, useEffect } from "react";
import history from "./history";
import api from "./api";

const Hooks = () => {
    const [logado, setLogado] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    //chamado após montar componente

    useEffect(() => {
        const storage = localStorage.getItem("@token");
        if (storage) {
            const token = JSON.parse(storage);
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setLogado(true);
        }
        setIsLoading(false);
        console.log("Storage. Token:", storage);
    }, []);

    const login = async (mail, senha) => {
        try {
            const { data } = await api.post("usuario/login", { mail, senha });
            localStorage.setItem("@token", JSON.stringify(data.token));
            api.defaults.headers.Authorization = `Bearer ${(data, data.token)}`;
            setLogado(true);
            history.push("/gasto");
        } catch (e) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const logout = () => {
        setLogado(false);
        localStorage.removeItem("@token");
        api.defaults.headers.Authorization = undefined;
        history.push("/login");
    };
    return { login, logout, logado, setLogado, isLoading };
};

export default Hooks;
