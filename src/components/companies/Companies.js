import React, { useState } from 'react';
import { Company } from './Company';
import { InvoiceCreate } from '../invoices/InvoiceCreate';
import companyService from '../../services/companyService';
import Modal from '../shared/Modal';
import SuccessMessage from '../shared/SuccessMessage';
import useFetchData from "../../hooks/useFetchData";
import { authService } from '../../services/authService';

const Companies = () => {
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [companiesArray, setCompaniesArray, loadingCompanies] = useFetchData(companyService.getAll);

  const token = authService.getToken();

  const handleActionClick = (companyId) => {
    if (token) {
        setSelectedCompanyId(companyId);
        setShowCreateInvoice(true);
      } else {
        alert('You must be logged in to perform this action.');
      }
  };

  const handleClose = () => {
    setShowCreateInvoice(false);
    companyService
        .getAll()
        .then((fetchedCompanies) => {
            setCompaniesArray(fetchedCompanies);
         }).catch((error) => {
            console.error("Error fetching companies:", error);
         });
  };

  const handleInvoiceCreated = () => {
    setSuccessMessage('Invoice Created');
  };

  if (loadingCompanies) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>VAT</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companiesArray.map((company) => (
              <Company key={company.id} {...company} onActionClick={handleActionClick} />
            ))}
          </tbody>
        </table>
      </div>
      {showCreateInvoice && (
        <Modal show={showCreateInvoice} onClose={handleClose}>
          <InvoiceCreate
            companyId={selectedCompanyId}
            onClose={handleClose}
            onInvoiceCreated={handleInvoiceCreated}
          />
        </Modal>
      )}
      {successMessage && (
              <Modal show={!!successMessage} onClose={() => setSuccessMessage(null)}>
                <SuccessMessage message={successMessage} />
              </Modal>
       )}
    </>
  );
};

export default Companies;

