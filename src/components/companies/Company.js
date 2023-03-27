import React from 'react';

const Company = ({ id, name, vat, onActionClick }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{vat}</td>
            <td>
                <button className="create-btn" onClick={() => onActionClick(id)}>Create Invoice</button>
            </td>
        </tr>
    );
};

export { Company };
