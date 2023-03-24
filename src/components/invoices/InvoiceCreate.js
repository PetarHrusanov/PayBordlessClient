/*
import React, { useState } from 'react';

const InvoiceCreate = () => {
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleCompanyChange = (event) => {
        setSelectedCompany(event.target.value);
        setSelectedService('');
    };

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Add code to submit the form data here
    };

    return (
        <div className="create-invoice">
            <h2>Create Invoice</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="company">Company:</label>
                    <select id="company" value={selectedCompany} onChange={handleCompanyChange} required>
                        <option value="">Select a company</option>
                        <option value="company1">Company 1</option>
                        <option value="company2">Company 2</option>
                        <option value="company3">Company 3</option>
                    </select>
                </div>
                {selectedCompany && (
                    <div>
                        <div className="form-group">
                            <label htmlFor="service">Service:</label>
                            <select id="service" value={selectedService} onChange={handleServiceChange} required>
                                <option value="">Select a service</option>
                                {selectedCompany === 'company1' && <option value="service1">Service 1</option>}
                                {selectedCompany === 'company2' && <option value="service2">Service 2</option>}
                                {selectedCompany === 'company3' && <option value="service3">Service 3</option>}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Quantity:</label>
                            <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} required />
                        </div>
                    </div>
                )}
                <button type="submit">Create Invoice</button>
            </form>
        </div>
    );
};

export default InvoiceCreate;
*/

import React, { useState, useEffect } from 'react';
import companyService from "../../services/companyService";

const InvoiceCreate = ({ companyId, onClose }) => {
    const [companyServices, setCompanyServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        companyService
            .getServicesByCompanyId(companyId)
            .then((services) => {
                setCompanyServices(services);
            })
            .catch((error) => {
                console.error('Error fetching services:', error);
            });
    }, [companyId]);

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Add logic to submit the form and create an invoice

        onClose();
    };

    return (
        <div className="create-invoice">
            <h2>Create Invoice for Company ID: {companyId}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="service">Service:</label>
                    <select
                        id="service"
                        value={selectedService}
                        onChange={handleServiceChange}
                        required
                    >
                        <option value="">Select a service</option>
                        {companyServices.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                        required
                    />
                </div>
                <button type="submit">Create Invoice</button>
            </form>
        </div>
    );
};

export { InvoiceCreate };
