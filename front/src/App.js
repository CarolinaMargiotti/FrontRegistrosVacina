import "./App.css";
import { Router, Switch } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import CustomRoute from "./CustomRoute";
import history from "./history";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Vacina from "./pages/Vacina";

function App() {
    return (
        <div>
            <AuthProvider>
                <Router history={history}>
                    <Menu />
                    <Switch>
                        <CustomRoute exact path="/login" component={Login} />
                        <CustomRoute
                            isPrivate
                            exact
                            path="/vacina"
                            component={Vacina}
                        />
                        <CustomRoute
                            isPrivate
                            exact
                            path="/registro"
                            component={Registro}
                        />
                    </Switch>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
