import React, { useState, useContext, useEffect, useCallback } from 'react';
import companyService from "../services/companyService";
import {CompanyEdit} from "./companies/CompanyEdit";
import serviceService from "../services/serviceService";
import { ServiceEdit } from "./services/ServiceEdit";
import { ServiceCreate } from "../components/services/ServiceCreate";
import CompanyCreate from "../components/companies/CompanyCreate";
import invoiceService from "../services/invoiceService";
import InvoiceContext from '../contexts/InvoiceContext';
import Modal from './shared/Modal';
import useFetchData from "../hooks/useFetchData";
import SuccessMessage from './shared/SuccessMessage';
import Table from './shared/Table';


export const Profile = () => {

    const [companiesArray, setCompaniesArray, loadingCompanies] = useFetchData(companyService.getByUserId);
    const [servicesArray, setServicesArray, loadingServices] = useFetchData(serviceService.getByUserId);
    const [invoicesArray, setInvoicesArray, loadingInvoices] = useFetchData(invoiceService.getUnapprovedByUserId);

    const [showEditWindow, setShowEditWindow] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [showServiceEditWindow, setShowServiceEditWindow] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showCompanyCreateWindow, setShowCompanyCreateWindow] = useState(false);
    const [showServiceCreateWindow, setShowServiceCreateWindow] = useState(false);
    const { setPendingInvoices } = useContext(InvoiceContext);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => setPendingInvoices(invoicesArray.length), [invoicesArray, setPendingInvoices]);

    const handleEditClick = (item, setter, toggler) => {
      setter(item);
      toggler(true);
    };

    const handleEditSubmit = async (item, service, setter, arraySetter, successMessage) => {
      try {
        await service.edit(...Object.values(item));
        setter(false);
        arraySetter((prev) => prev.map((i) => (i.id === item.id ? item : i)));
        setSuccessMessage(successMessage);

      } catch (error) {
        console.error(`Error updating ${service}:`, error);
      }
    };

    const handleDelete = async (id, service, arraySetter, message) => {
      try {
        await service.delete(id);
        arraySetter((prev) => prev.filter((i) => i.id !== id));
        setSuccessMessage(message);
      } catch (error) {
        console.error(`Error deleting ${service}:`, error);
      }
    };

    const handleCreateSubmit = useCallback(async (newItem, service, arraySetter, onClose) => {
          try {
            await service.create(...Object.values(newItem));
            setSuccessMessage(`${service} created successfully!`);
            arraySetter(await service.getByUserId());
            onClose();
          } catch (error) {
            console.error(`Error creating ${service}:`, error);
          }
        }, []);

    const handleInvoiceApproval = async (invoiceId, isApproved) => {
      try {
        await invoiceService.setApprovalStatus(invoiceId, isApproved);
        setInvoicesArray(await invoiceService.getUnapprovedByUserId());
        setPendingInvoices((prev) => prev - 1);
      } catch (error) {
        console.error("Error updating invoice approval status:", error);
      }
    };

    const handleCompanyEditClick = (company) => handleEditClick(company, setSelectedCompany, setShowEditWindow);
    const handleCompanyEditSubmit = (updatedCompany) => handleEditSubmit(updatedCompany, companyService, setShowEditWindow, setCompaniesArray, "Company updated successfully!");

    const handleServiceEditClick = (service) => handleEditClick(service, setSelectedService, setShowServiceEditWindow);
    const handleServiceEditSubmit = (updatedService) => handleEditSubmit(updatedService, serviceService, setShowServiceEditWindow, setServicesArray, "Service updated successfully!");

    const handleCompanyDelete = (companyId) => handleDelete(companyId, companyService, setCompaniesArray, "Company Deleted");
    const handleServiceDelete = (serviceId) => handleDelete(serviceId, serviceService, setServicesArray, "Service Deleted");

    const handleCompanyCreateClick = useCallback(() => {
        setShowCompanyCreateWindow((prevShowCompanyCreateWindow) => !prevShowCompanyCreateWindow);
    }, []);

    const handleCompanyCreateSubmit = useCallback((newCompany) => {
        handleCreateSubmit(newCompany, companyService, setCompaniesArray, handleCompanyCreateClick);
    }, [handleCreateSubmit, handleCompanyCreateClick, setCompaniesArray]);

    const handleServiceCreateClick = useCallback(() => {
        setShowServiceCreateWindow((prevShowServiceCreateWindow) => !prevShowServiceCreateWindow);
    }, []);

    const handleServiceCreateSubmit = useCallback((newService) => {
        handleCreateSubmit(newService, serviceService, setServicesArray, handleServiceCreateClick);
    }, [handleCreateSubmit, handleServiceCreateClick, setServicesArray]);

    if (loadingCompanies || loadingServices || loadingInvoices) {
        return <div className="loading-container">Loading...</div>;
    }

    return (
        <div className="container">
        <h2 className="heading">Your Invoices</h2>
         {invoicesArray.length > 0 ? (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Service</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Recipient Company</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoicesArray.map((item) => {
                  const { id, serviceName, quantity, total, recipientName } = item;
                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{serviceName}</td>
                      <td>{quantity}</td>
                      <td>{total}</td>
                      <td>{recipientName}</td>
                      <td>
                        <button
                          className="create-btn"
                          onClick={() => handleInvoiceApproval(id, true)}
                        >
                          Approve
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleInvoiceApproval(id, false)}
                        >
                          Disapprove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>) :
          (
           <p>There are no invoices pending for approval.</p>
           )}
              <h2 className="heading">Your Companies</h2>
              <button className="create-btn" onClick={handleCompanyCreateClick}>Create Company</button>
              {showCompanyCreateWindow && (
                <Modal show={showCompanyCreateWindow} onClose={handleCompanyCreateClick}>
                  <CompanyCreate onSubmit={handleCompanyCreateSubmit} />
                </Modal>
              )}
              {successMessage && (
                <Modal show={!!successMessage} onClose={() => setSuccessMessage(null)}>
                  <SuccessMessage message={successMessage} />
                </Modal>
              )}
                {companiesArray.length > 0 ? (
                      <Table
                        columns={["ID", "Name", "VAT", "Owner", "Actions"]}
                        data={companiesArray}
                        actions={({ id, name, vat, owner, userId }) => (
                          <tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{vat}</td>
                            <td>{owner}</td>
                            <td>
                              <button
                                className="create-btn"
                                onClick={() => handleCompanyEditClick({ id, name, vat, owner, userId })}
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        )}
                      />
                    ) : (
                      <p>No companies found. Please create a company.</p>
                    )}
              {successMessage && (
                <Modal show={!!successMessage} onClose={() => setSuccessMessage(null)}>
                  <SuccessMessage message={successMessage} />
                </Modal>
              )}
              {showEditWindow && (
                <Modal show={showEditWindow} onClose={() => setShowEditWindow(false)}>
                  <CompanyEdit company={selectedCompany} onSubmit={handleCompanyEditSubmit} onDelete={() => handleCompanyDelete(selectedCompany.id)} onClose={() => setShowEditWindow(false)} />
                </Modal>
              )}

           <h2 className="heading">Your Services</h2>
           <button className="create-btn" onClick={handleServiceCreateClick}>Create Service</button>
           {showServiceCreateWindow && (
             <Modal show={showServiceCreateWindow} onClose={handleServiceCreateClick}>
               <ServiceCreate onSubmit={handleServiceCreateSubmit} />
             </Modal>
           )}
           {successMessage && (
             <Modal show={!!successMessage} onClose={() => setSuccessMessage(null)}>
               <SuccessMessage message={successMessage} />
             </Modal>
             )}
            {servicesArray.length > 0 ? (
            <Table
             columns={["ID", "Name", "Price", "Company", "Actions"]}
             data={servicesArray}
             actions={({ id, name, price, companyName, companyId }) => (
                <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>{companyName}</td>
                <td>
                    <button
                        className="create-btn"
                        onClick={() => handleServiceEditClick({ id, name, price, companyId })}
                    >
                        Edit
                    </button>
                </td>
                </tr>
                )}
             />
            ) : (
            <p>No services found. Please create a service.</p>
            )}
            {showServiceEditWindow && (
            <Modal show={showServiceEditWindow} onClose={() => setShowServiceEditWindow(false)}>
                <ServiceEdit service={selectedService} onSubmit={handleServiceEditSubmit} onDelete={() => handleServiceDelete(selectedService.id)} onClose={() => setShowServiceEditWindow(false)} />
            </Modal>
           )}
    </div>
    )
};


