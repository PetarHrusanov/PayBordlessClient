import React from 'react';

const Company = ({ id, name, vat, onActionClick }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{vat}</td>
            <td>
                <button onClick={() => onActionClick(id)}>Create Invoice</button>
            </td>
        </tr>
    );
};

export { Company };
