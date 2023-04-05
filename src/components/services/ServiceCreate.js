import React, { useState, useEffect } from 'react';
import companyService from '../../services/companyService';

const ServiceCreate = ({ onSubmit }) => {
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

    const handleSubmit = async (event) => {
        event.preventDefault();

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

        onSubmit({name, price, companyId})
    };

    return (
        <div className="create-form">
            <h3>Create Service</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="company">Company:</label>
                <select id="company" value={companyId} onChange={(e) => setCompanyId(e.target.value)} required>
                    <option value="">Select a company</option>
                    {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                            {company.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <button type="submit" className="edit-window-button">Create Service</button>
            </form>
        </div>
    );
};

export { ServiceCreate };
