import React, { useContext } from "react";
import { Context } from "../AuthContext";
import { Nav, NavItem, NavbarBrand, NavLink } from "reactstrap";

function Menu() {
    const { logout, logado, perfil } = useContext(Context);
    return (
        <Nav className="align-items-center border-bottom border-success border-2">
            <NavbarBrand className="m-2 text-dark">
                <h4 style={{ userSelect: "none" }}>Cadastro de vacinas</h4>
            </NavbarBrand>
            {logado && (
                <>
                    <NavItem>
                        <NavLink className="text-success" href="/registro">
                            Registro
                        </NavLink>
                    </NavItem>

                    {perfil === "admin" && (
                        <>
                            <NavItem>
                                <NavLink
                                    className="text-success"
                                    href="/perfil"
                                >
                                    Perfil
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="text-success"
                                    href="/vacina"
                                >
                                    Vacina
                                </NavLink>
                            </NavItem>
                        </>
                    )}
                    <NavItem>
                        <NavLink className="text-success" href="/seusdados">
                            Seus dados
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="text-success"
                            style={{ cursor: "pointer" }}
                            onClick={() => logout()}
                        >
                            Logout
                        </NavLink>
                    </NavItem>
                </>
            )}
            {!logado && (
                <>
                    <NavLink className="text-success" href="/login">
                        Login
                    </NavLink>
                    <NavLink className="text-success" href="/cadastro">
                        Criar conta
                    </NavLink>
                </>
            )}
        </Nav>
    );
}

export default Menu;
