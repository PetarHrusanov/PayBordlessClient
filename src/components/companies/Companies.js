import React, { useEffect, useState } from 'react';
import { Company } from './Company';
import { InvoiceCreate } from '../invoices/InvoiceCreate';
import companyService from '../../services/companyService';
import Modal from '../shared/Modal';
import SuccessMessage from '../shared/SuccessMessage';

const Companies = () => {
  const [companiesArray, setCompaniesArray] = useState([]);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchCompanies = () => {
    companyService
      .getAll()
      .then((result) => {
        setCompaniesArray(result);
      })
      .catch((error) => {
        console.error('Error fetching companies:', error);
      });
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleActionClick = (companyId) => {
    setSelectedCompanyId(companyId);
    setShowCreateInvoice(true);
  };

  const handleClose = () => {
    setShowCreateInvoice(false);
    setSuccessMessage('Invoice Created');
    fetchCompanies();
  };

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
