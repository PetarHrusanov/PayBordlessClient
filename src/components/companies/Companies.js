import React, { useEffect, useState } from 'react';
import { Company } from './Company';
import {InvoiceCreate} from '../invoices/InvoiceCreate';
import companyService from "../../services/companyService";

const Companies = () => {
    const [companiesArray, setCompaniesArray] = useState([]);
    const [showCreateInvoice, setShowCreateInvoice] = useState(false);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);

    const fetchCompanies = () => {
        companyService
            .getAll()
            .then((result) => {
                setCompaniesArray(result);
            })
            .catch((error) => {
                console.error('Error fetching companies:', error);
            });
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const handleActionClick = (companyId) => {
        setSelectedCompanyId(companyId);
        setShowCreateInvoice(true);
    };

    const handleClose = () => {
        setShowCreateInvoice(false);
        fetchCompanies();
    };

    return (
        <>
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>VAT</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {companiesArray.map((company) => (
                        <Company key={company.id} {...company} onActionClick={handleActionClick} />
                    ))}
                    </tbody>
                </table>
            </div>
            {showCreateInvoice && (
                <InvoiceCreate companyId={selectedCompanyId} onClose={handleClose} />
            )}
        </>
    );
};

export default Companies;
