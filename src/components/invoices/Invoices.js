import React, { useEffect, useState } from 'react';
import invoiceService from '../../services/invoiceService';
import { Invoice } from './Invoice';
import jsPDF from 'jspdf';

const Invoices = () => {
  const [invoicesArray, setInvoicesArray] = useState([]);

  const fetchInvoices = () => {
    invoiceService
      .getByUserId()
      .then((result) => {
        setInvoicesArray(result);
      })
      .catch((error) => {
        console.error('Error fetching invoices:', error);
      });
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleDownloadClick = (invoice) => {
    const { id, serviceName, quantity, total } = invoice;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Invoice #${id}`, 10, 10);
    doc.setFontSize(14);
    doc.text(`Service: ${serviceName}`, 10, 30);
    doc.text(`Quantity: ${quantity}`, 10, 40);
    doc.text(`Total: ${total}`, 10, 50);

    doc.save(`Invoice-${id}.pdf`);
  };

  return (
    <>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoicesArray.map((invoice) => (
              <Invoice
                key={invoice.id}
                invoice={invoice}
                onDownloadClick={handleDownloadClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Invoices;
