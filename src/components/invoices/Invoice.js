import React from 'react';

export const Invoice = ({ invoice, onDownloadClick }) => {
  const { serviceName, quantity, total, issuerName, recipientName } = invoice;

  return (
    <tr>
      <td>{serviceName}</td>
      <td>{quantity}</td>
      <td>{total}</td>
      <td>{issuerName}</td>
      <td>{recipientName}</td>
      <td>
        <button className="create-btn" onClick={() => onDownloadClick(invoice)}>Download</button>
      </td>
    </tr>
  );
};
