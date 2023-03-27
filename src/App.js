// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/shared/Header";
import HomePage from "./components/HomePage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Companies from "./components/companies/Companies";
import Services from "./components/services/Services";
import Invoices from "./components/invoices/Invoices";
import {Profile} from "./components/Profile";
import PrivateRoute from './components/PrivateRoute';
import InvoiceContext from './contexts/InvoiceContext';


const App = () => {
    const [pendingInvoices, setPendingInvoices] = useState(0);
    return (
    <InvoiceContext.Provider value={{ pendingInvoices, setPendingInvoices }}>
        <Router>
            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/invoices" element={<PrivateRoute />}>
                    <Route index element={<Invoices />} />
                    </Route>
                <Route path="/profile" element={<PrivateRoute />}>
                    <Route index element={<Profile />} />
                    </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/services" element={<Services />} />
            </Routes>
        </Router>
        </InvoiceContext.Provider>
    );
};

export default App;
