import React, { useState } from 'react';
import serviceService from "../../services/serviceService";

export const ServiceEdit = ({service, companies, onSubmit, onClose}) => {
    const [name, setName] = useState(service.name);
    const [price, setPrice] = useState(service.price);
    const [companyId, setCompanyId] = useState(service.companyId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await serviceService.edit(service.id, name, price, companyId);
            onSubmit({...service, name, price, companyId});
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await serviceService.delete(service.id);
            onSubmit({...service, isDeleted: true});
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="edit-window">
            <h3>Edit Service</h3>
            <button className="close-btn" onClick={handleClose}>&times;</button>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
                <label>Company:</label>
                <select value={companyId} onChange={(e) => setCompanyId(e.target.value)}>
                  {companies.map(company => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
                <button type="submit">Save</button>
            </form>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
    );
};
