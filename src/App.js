// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Protected from './components/Protected';
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Companies from "./components/Companies";
import CompanyCreate from "./components/CompanyCreate";

const App = () => {
    return (
        <Router>
            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/login" element={<Login />} />
                <Route path="/company-create" element={<CompanyCreate />} />
                <Route path="/protected" element={<PrivateRoute />} >
                    <Route index element={<Protected />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
