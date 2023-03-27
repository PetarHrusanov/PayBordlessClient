import React, { useState, useEffect } from 'react';
import companyService from "../../services/companyService";
import invoiceService from "../../services/invoiceService";


const InvoiceCreate = ({ companyId, serviceId, onClose }) => {
    const [companyServices, setCompanyServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [companies, setCompanies] = useState([]);
    const [recipientCompanyId, setRecipientCompanyId] = useState('');


    useEffect(() => {
            companyService
                .getServicesByCompanyId(companyId)
                .then((services) => {
                    setCompanyServices(services);

                    // Preselect service if serviceId is passed
                    if (serviceId) {
                        const selected = services.find(service => service.id === serviceId);
                        if (selected) {
                            setSelectedService(selected.id);
                            setPrice(selected.price);
                        }
                    }
                })
                .catch((error) => {
                    console.error('Error fetching services:', error);
                });

        companyService
            .getByUserId()
            .then((companies) => {
                setCompanies(companies);
            })
            .catch((error) => {
                console.error('Error fetching companies:', error);
            });
    }, [companyId, serviceId]);

    const handleServiceChange = (event) => {
        const selected = companyServices.find(service => service.id === parseInt(event.target.value));
        setSelectedService(selected.id);
        setPrice(selected.price);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleRecipientCompanyChange = (event) => {
        setRecipientCompanyId(event.target.value);
    };


   const handleSubmit = async (event) => {
       event.preventDefault();

       try {
           const total = quantity * price;
           await invoiceService.create(selectedService, quantity, total, recipientCompanyId);
           onClose();
       } catch (error) {
           console.error('Error creating invoice:', error);
       }
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
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="total">Total:</label>
                    <input
                        type="number"
                        id="total"
                        value={quantity * price}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="recipientCompany">Recipient Company:</label>
                    <select
                        id="recipientCompany"
                        value={recipientCompanyId}
                        onChange={handleRecipientCompanyChange}
                        required
                    >
                        <option value="">Select a recipient company</option>
                        {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Create Invoice</button>
            </form>
        </div>
    );
};

export { InvoiceCreate };
