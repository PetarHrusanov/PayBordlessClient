import React, {useState, useContext} from 'react';
import { NavLink } from 'react-router-dom';
import {authService} from "../../services/authService";
// ... other imports ...
import InvoiceContext from '../../contexts/InvoiceContext';
import '../../styles/Header.css';

const Header = () => {
    const [token, setToken] = useState(getToken());
    const { pendingInvoices } = useContext(InvoiceContext);
    function getToken() {
        const token = localStorage.getItem('token');
        return token ? token : null;
    }

    const handleLogout = () => {
        authService.logout();
        setToken(null);
    };

    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/companies" className={({ isActive }) => (isActive ? "active" : "")}>
                            Companies
                        </NavLink>
                    </li>
                    {!token && (
                        <React.Fragment>
                            <li className="nav-item">
                                <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
                                    Register
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                                    Login
                                </NavLink>
                            </li>
                        </React.Fragment>
                    )}
                    {token && (
                        <React.Fragment>
                            <li className="nav-item">
                                <NavLink to="/invoices" className={({ isActive }) => (isActive ? "active" : "")}>
                                    Invoices
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : "")}>
                                    Services
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
                                  Profile
                                  {pendingInvoices > 0 && (
                                    <span className="pending-invoices-count" title="Pending invoices">
                                      {pendingInvoices}
                                    </span>
                                  )}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <button className="logout-btn" onClick={handleLogout}>Logout</button>
                            </li>
                        </React.Fragment>
                    )}

                </ul>
            </nav>
        </header>
    );
};


export default Header;
