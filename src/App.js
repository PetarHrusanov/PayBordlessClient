// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from "./components/shared/Header";
import HomePage from "./components/HomePage";
import Companies from "./components/companies/Companies";
import CompanyCreate from "./components/companies/CompanyCreate";
import Invoices from "./components/invoices/Invoices";
import InvoiceCreate from "./components/invoices/InvoiceCreate";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import {Profile} from "./components/Profile";

const App = () => {
    return (
        <Router>
            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/invoice-create" element={<InvoiceCreate />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/company-create" element={<CompanyCreate />} />
            </Routes>
        </Router>
    );
};

export default App;
