import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
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
                        <NavLink to="/protected" activeClassName="active">
                            Protected Page
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};


export default Header;
