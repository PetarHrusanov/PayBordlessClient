import React, { useState } from 'react';
import serviceService from '../../services/serviceService'; // Import the serviceService, assuming it's already created

const ServiceCreate = ({ onClose }) => {
    const [serviceName, setServiceName] = useState('');
    const [servicePrice, setServicePrice] = useState('');

    const handleServiceNameChange = (event) => {
        setServiceName(event.target.value);
    };

    const handleServicePriceChange = (event) => {
        setServicePrice(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form data
        if (!serviceName) {
            alert('Please enter a name for the service');
            return;
        }

        if (!servicePrice || isNaN(servicePrice)) {
            alert('Please enter a valid price for the service');
            return;
        }

        try {
            await serviceService.create(serviceName, servicePrice);
            alert('Service created successfully!');
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Create Service</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="serviceName">Name:</label>
                    <input
                        type="text"
                        id="serviceName"
                        value={serviceName}
                        onChange={handleServiceNameChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="servicePrice">Price:</label>
                    <input
                        type="number"
                        id="servicePrice"
                        value={servicePrice}
                        onChange={handleServicePriceChange}
                        required
                    />
                </div>
                <button type="submit">Create Service</button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export { ServiceCreate };
