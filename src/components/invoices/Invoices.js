import React from 'react';
import invoiceService from '../../services/invoiceService';
import { Invoice } from './Invoice';
import jsPDF from 'jspdf';
import useFetchData from "../../hooks/useFetchData";
import '../../styles/CreatePrompt.css';

const Invoices = () => {

  const [invoicesArray, _, loadingInvoices] = useFetchData(invoiceService.getByUserId);
  const handleDownloadClick = (invoice) => {
  const { id, serviceName, quantity, total, issuerName, recipientName } = invoice;


    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Invoice #${id}`, 10, 10);
    doc.setFontSize(14);
    doc.text(`Service: ${serviceName}`, 10, 30);
    doc.text(`Issued by : ${issuerName}`, 10, 40);
    doc.text(`Issued for : ${recipientName}`, 10, 50);
    doc.text(`Quantity: ${quantity}`, 10, 60);
    doc.text(`Total: ${total}`, 10, 70);

    doc.save(`Invoice-${id}.pdf`);
  };

  if (loadingInvoices) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <>
      {invoicesArray.length === 0 ? (
        <div className="container"><p>There are no invoices yet. <a href="/companies" className="create-link">Create an invoice</a>
        </p></div>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Service Name</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Issuer</th>
                <th>Recipient</th>
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
      )}
    </>
  );
};

export default Invoices;
