import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [token, setToken] = useState(getToken());

    function getToken() {
        const tokenCookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="));

        if (tokenCookie) {
            return tokenCookie.split("=")[1];
        }
        return null;
    }

    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink to="/" exact activeClassName="active">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/companies" exact activeClassName="active">
                            Companies
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/invoices" exact activeClassName="active">
                            Invoices
                        </NavLink>
                    </li>
                    {token ? null : (
                        <li className="nav-item">
                            <NavLink to="/register" exact activeClassName="active">
                                Register
                            </NavLink>
                        </li>
                    )}

                        {/*<li className="nav-item">*/}
                        {/*    <NavLink to="/register" exact activeClassName="active">*/}
                        {/*        Register*/}
                        {/*    </NavLink>*/}
                        {/*</li>*/}
                </ul>
            </nav>
        </header>
    );
};


export default Header;
