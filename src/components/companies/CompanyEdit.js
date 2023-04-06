import React, { useState } from 'react';

export const CompanyEdit = ({company, onSubmit, onDelete, onClose}) => {
    const [name, setName] = useState(company.name);
    const [vat, setVat] = useState(company.vat);
    const [owner, setOwner] = useState(company.owner);
    const userId = company.userId;

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit({...company, name, vat, owner, userId});
    };

    const handleDelete = async () => {
        onDelete();
        onClose();
        };

    return (
        <div className="create-form">
            <h3>Edit Company</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="vat">VAT:</label>
                    <input type="number" id="vat" value={vat} onChange={(e) => setVat(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="owner">Owner:</label>
                    <input type="text" id="owner" value={owner} onChange={(e) => setOwner(e.target.value)} required/>
                </div>
                <button type="submit">Save</button>
            </form>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
    );
};
