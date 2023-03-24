import React from 'react';

const Service = ({ id, name, price, onActionClick }) => {
    const handleActionClick = () => {
        onActionClick(id);
    };

    return (
        <tr>
            <td>{name}</td>
            <td>{price}</td>
            <td>
                <button onClick={handleActionClick}>Create Invoice</button>
            </td>
        </tr>
    );
};

export { Service };
