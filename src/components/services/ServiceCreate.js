import React, { useState, useEffect } from 'react';
import companyService from '../../services/companyService';
import serviceService from '../../services/serviceService';

const ServiceCreate = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const fetchedCompanies = await companyService.getByUserId();
            setCompanies(fetchedCompanies);
        } catch (err) {
            console.error(err);
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleCompanyChange = (event) => {
        setCompanyId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form data
        if (!name) {
            alert('Please enter a name for the service');
            return;
        }

        if (!price || isNaN(price)) {
            alert('Please enter a valid price for the service');
            return;
        }

        if (!companyId) {
            alert('Please select a company');
            return;
        }

        try {
            await serviceService.create(name, price, companyId);
            alert('Service created successfully!');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="create-company">
            <h1>Create Service</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="company">Company:</label>
                    <select id="company" value={companyId} onChange={handleCompanyChange} required>
                        <option value="">Select a company</option>
                        {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={handlePriceChange}
                        required
                    />
                </div>
                <button type="submit">Create Service</button>
            </form>
        </div>
    );
};

export { ServiceCreate };
