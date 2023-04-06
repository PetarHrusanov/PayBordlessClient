import React, { useState } from 'react';

export const ServiceEdit = ({ service, onSubmit, onDelete, onClose }) => {
    const [name, setName] = useState(service.name);
    const [price, setPrice] = useState(service.price);
    const companyId = service.companyId;

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit({ ...service, name, price, companyId });
    };

    const handleDelete = async () => {
        onDelete();
        onClose();
    };

    return (
        <div className="create-form">
          <h3>Edit Service</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <button type="submit">Save</button>
          </form>
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
    );
};
