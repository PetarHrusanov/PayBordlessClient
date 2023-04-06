import React, { useState } from 'react';
import companyService from "../../services/companyService";

export const CompanyEdit = ({company, onSubmit, onDelete, onClose}) => {
    const [name, setName] = useState(company.name);
    const [vat, setVat] = useState(company.vat);
    const [owner, setOwner] = useState(company.owner);
    const userId = company.userId;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await companyService.edit(company.id, name, vat, owner, userId);
            onSubmit({...company, name, vat, owner, userId});
        } catch (error) {
            alert('Error updating company:', error);
        }
    };

    const handleDelete = async () => {
        onDelete();
        onClose();
        };

    return (
        <div className="create-company">
            <h3>Edit Company</h3>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                <label>VAT:</label>
                <input type="number" value={vat} onChange={(e) => setVat(e.target.value)} required/>
                <label>Owner:</label>
                <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} required/>
                <button type="submit">Save</button>
            </form>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
    );
};
