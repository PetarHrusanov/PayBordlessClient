import React, { useState } from 'react';
import serviceService from "../../services/serviceService";

export const ServiceEdit = ({ service, onSubmit, onDelete, onClose }) => {
    const [name, setName] = useState(service.name);
    const [price, setPrice] = useState(service.price);
    const companyId = service.companyId;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await serviceService.edit(service.id, name, price, companyId);
            onSubmit({ ...service, name, price, companyId });
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };

    const handleDelete = async () => {
            onDelete();
            onClose();
            };

    return (
        <div className="create-company">
            <h3>Edit Service</h3>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required/>
                <button type="submit">Save</button>
            </form>
           <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
    );
};
