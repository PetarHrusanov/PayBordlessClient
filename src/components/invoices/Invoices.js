// Invoices.js
import React from 'react';
import invoicesDummy from '../../dummy-data/invoices-dummy.json';
import { Invoice } from './Invoice';
import { Link } from 'react-router-dom';

const Invoices = () => {
    const onInfoClick = (invoice) => {
        console.log('Invoice info clicked:', invoice);
    };

    return (
        <>
            <div className="create-button">
                <Link to="/invoice-create">
                    <button>Create Invoice</button>
                </Link>
            </div>
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>Issuer</th>
                        <th>Services</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {invoicesDummy.invoices.map((invoice) => (
                        <Invoice
                            key={invoice.id}
                            {...invoice}
                            onInfoClick={onInfoClick}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Invoices;
