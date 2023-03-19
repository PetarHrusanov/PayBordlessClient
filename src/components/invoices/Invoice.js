import React from 'react';

export const Invoice = ({ id, number, Issuer, Services, Total, onInfoClick }) => {
    return (
        <tr>
            <td>{number}</td>
            <td>{Issuer}</td>
            <td>
                {Services.Name} - {Services.Price} - {Services.Quantity}
            </td>
            <td>{Total}</td>
            <td>
                <button onClick={() => onInfoClick({ id, number, Issuer, Services, Total })}>
                    Info
                </button>
            </td>
        </tr>
    );
};
