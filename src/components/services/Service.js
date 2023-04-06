import React from 'react';

const Service = ({ id, name, price, companyName, vat, owner, onActionClick }) => {
    const handleActionClick = () => {
        onActionClick(id);
    };

    return (
        <tr>
            <td>{name}</td>
            <td>{price}</td>
            <td>{companyName}</td>
            <td>{vat}</td>
            <td>{owner}</td>
            <td>
                <button className="create-btn" onClick={handleActionClick}>Create Invoice</button>
            </td>
        </tr>
    );
};

export { Service };
