import "./App.css";
import { Router, Switch } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import CustomRoute from "./CustomRoute";
import history from "./history";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Vacina from "./pages/Vacina";
import Perfil from "./pages/Perfil";
import SeusDados from "./pages/SeusDados";
import Cadastro from "./pages/Cadastro";

function App() {
    return (
        <div>
            <AuthProvider>
                <Router history={history}>
                    <Menu />
                    <Switch>
                        <CustomRoute exact path="/login" component={Login} />
                        <CustomRoute
                            isAdmin
                            isPrivate
                            exact
                            path="/vacina"
                            component={Vacina}
                        />
                        <CustomRoute
                            isPrivate
                            exact
                            path="/seusdados"
                            component={SeusDados}
                        />
                        <CustomRoute
                            isAdmin
                            isPrivate
                            exact
                            path="/perfil"
                            component={Perfil}
                        />
                        <CustomRoute
                            isPrivate
                            exact
                            path="/registro"
                            component={Registro}
                        />
                        <CustomRoute
                            exact
                            path="/cadastro"
                            component={Cadastro}
                        />
                    </Switch>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
