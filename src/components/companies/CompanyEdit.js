import React, { useState } from 'react';
import companyService from "../../services/companyService";

export const CompanyEdit = ({company, onSubmit, onClose}) => {
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
            console.error('Error updating company:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await companyService.delete(company.id);
            onSubmit({...company, isDeleted: true});
        } catch (error) {
            console.error('Error deleting company:', error);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="edit-window">
            <h3>Edit Company</h3>
            <button className="close-btn" onClick={handleClose}>&times;</button>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                <label>VAT:</label>
                <input type="text" value={vat} onChange={(e) => setVat(e.target.value)}/>
                <label>Owner:</label>
                <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)}/>
                <button type="submit">Save</button>
            </form>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
    );
};
