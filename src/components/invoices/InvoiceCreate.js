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
