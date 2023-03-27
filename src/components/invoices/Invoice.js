import React from 'react';
import jsPDF from 'jspdf';

export const Invoice = ({ invoice, onDownloadClick }) => {
  const { id, serviceName, quantity, total } = invoice;

  return (
    <tr>
      <td>{serviceName}</td>
      <td>{quantity}</td>
      <td>{total}</td>
      <td>
        <button className="create-btn" onClick={() => onDownloadClick(invoice)}>Download</button>
      </td>
    </tr>
  );
};
