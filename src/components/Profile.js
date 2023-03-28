import React, { useEffect, useState, useContext } from 'react';
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
    const [showApproveDisapproveButtons, setShowApproveDisapproveButtons] = useState(false);
    const { pendingInvoices, setPendingInvoices } = useContext(InvoiceContext);

    const [successMessage, setSuccessMessage] = useState(null);

    const handleEditClick = (company) => {
        setSelectedCompany(company);
        setShowEditWindow(true);
    };

    const handleEditSubmit = (updatedCompany) => {
        companyService.edit(updatedCompany.id, updatedCompany.name, updatedCompany.vat, updatedCompany.owner, updatedCompany.userId)
            .then(() => {
                setShowEditWindow(false);
                setSelectedCompany(null);
                setCompaniesArray((prevCompanies) => prevCompanies.map(company => company.id === updatedCompany.id ? updatedCompany : company));
            })
            .catch(error => {
                console.error('Error updating company:', error);
            });
    };

    const handleServiceEditClick = (service) => {
        setSelectedService(service);
        setShowServiceEditWindow(true);
    };

    const handleServiceEditSubmit = (updatedService) => {
        if (updatedService.isDeleted) {
            setServicesArray(servicesArray.filter(service => service.id !== updatedService.id));
        } else {
            setServicesArray(
                servicesArray.map(service =>
                    service.id === updatedService.id ? updatedService : service
                )
            );
        }
        setShowServiceEditWindow(false);
    };

    const handleCompanyCreateClick = () => {
        setShowCompanyCreateWindow(!showCompanyCreateWindow);
    };

    const handleCompanyCreateSubmit = (newCompany) => {
      companyService
        .create(newCompany.name, newCompany.vat, newCompany.owner)
        .then(() => {
          setSuccessMessage("Company created successfully!");
          handleCompanyCreateClick();
          // Refetch companies
          companyService
            .getByUserId()
            .then((fetchedCompanies) => {
              setCompaniesArray(fetchedCompanies);
            })
            .catch((error) => {
              console.error("Error fetching companies:", error);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const handleServiceCreateClick = () => {
        setShowServiceCreateWindow(!showServiceCreateWindow);
    };

    const handleInvoiceApproval = (invoiceId, isApproved) => {
        invoiceService
            .setApprovalStatus(invoiceId, isApproved)
            .then((updatedInvoice) => {
                setInvoicesArray((prevInvoices) => prevInvoices.filter(invoice => invoice.id !== updatedInvoice.id));
                setPendingInvoices((prevPendingInvoices) => prevPendingInvoices - 1);
            })
            .catch((error) => {
                console.error("Error updating invoice approval status:", error);
            });
    };

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
                 <CompanyCreate
                     onSubmit={handleCompanyCreateSubmit}
                 />
             </Modal>
         )}
         {successMessage && (
           <Modal show={!!successMessage} onClose={() => setSuccessMessage(null)}>
             <SuccessMessage message={successMessage} />
           </Modal>
         )}
        {companiesArray.length > 0 ? (
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>VAT</th>
                        <th>Owner</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {companiesArray.map((item) => {
                    console.log(item);
                        const { id, name, vat, owner, userId } = item;
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{vat}</td>
                                <td>{owner}</td>
                                <td>
                                    <button className="create-btn" onClick={() => handleEditClick({ id, name, vat, owner, userId })}>Edit</button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
             ) : (
                    <p>No companies found. Please create a company.</p>
                  )}
            {showEditWindow && (
              <Modal show={showEditWindow} onClose={() => setShowEditWindow(false)}>
                <CompanyEdit company={selectedCompany} onSubmit={handleEditSubmit} onClose={() => setShowEditWindow(false)} />
              </Modal>
            )}

            <h2 className="heading">Your Services</h2>
            <button className="create-btn" onClick={handleServiceCreateClick}>Create Service</button>
           {showServiceCreateWindow && (
                 <Modal show={showServiceCreateWindow} onClose={handleServiceCreateClick}>
                   <ServiceCreate
                     onClose={() => {
                       handleServiceCreateClick();
                     }}
                   />
                 </Modal>
               )}

            {servicesArray.length > 0 ? (
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Company ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicesArray.map((item) => {
                            const { id, name, price, companyName, companyId } = item;
                                return (
                                    <tr key={id}>
                                        <td>{id}</td>
                                        <td>{name}</td>
                                        <td>{price}</td>
                                        <td>{companyName}</td>
                                        <td>
                                            <button className="create-btn" onClick={() => handleServiceEditClick({ id, name, price, companyId })}>Edit</button>
                                        </td>
                                    </tr>
                                        );
                                    })}
                    </tbody>
                </table>
            </div>
            ) : (
            <p>No services found. Please create a service.</p>
            )}
            {showServiceEditWindow && (
                        <Modal show={showServiceEditWindow} onClose={() => setShowServiceEditWindow(false)}>
                            <ServiceEdit service={selectedService} onSubmit={handleServiceEditSubmit} />
                        </Modal>
                    )}
            {showServiceCreateWindow && <ServiceCreate />}
    </div>
    )
};


