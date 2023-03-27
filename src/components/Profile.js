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


export const Profile = () => {
    const [companiesArray, setCompaniesArray] = useState([]);
    const [showEditWindow, setShowEditWindow] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [servicesArray, setServicesArray] = useState([]); // Add this line
    const [showServiceEditWindow, setShowServiceEditWindow] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showCompanyCreateWindow, setShowCompanyCreateWindow] = useState(false);
    const [showServiceCreateWindow, setShowServiceCreateWindow] = useState(false);
    const [invoicesArray, setInvoicesArray] = useState([]);
    const [showApproveDisapproveButtons, setShowApproveDisapproveButtons] = useState(false);
    const [loadingCompanies, setLoadingCompanies] = useState(true);
    const [loadingServices, setLoadingServices] = useState(true);
    const [loadingInvoices, setLoadingInvoices] = useState(true);
    const { pendingInvoices, setPendingInvoices } = useContext(InvoiceContext);


    const fetchCompanies = () => {
            setLoadingCompanies(true);
            companyService.getByUserId()
                .then(result => {
                    setCompaniesArray(result);
                    setLoadingCompanies(false);
                })
                .catch(error => {
                    console.error('Error fetching companies:', error);
                    setLoadingCompanies(false);
                });
        };

        const fetchServices = () => {
            setLoadingServices(true);
            serviceService.getByUserId()
                .then(result => {
                    setServicesArray(result);
                    setLoadingServices(false);
                })
                .catch(error => {
                    console.error('Error fetching services:', error);
                    setLoadingServices(false);
                });
        };

        const fetchInvoices = () => {
            setLoadingInvoices(true);
            invoiceService.getUnapprovedByUserId()
                .then((result) => {
                    setInvoicesArray(result);
                    setPendingInvoices(result.length);
                    setLoadingInvoices(false);
                })
                .catch((error) => {
                    console.error("Error fetching invoices:", error);
                    setLoadingInvoices(false);
                });
        };




    useEffect(() => {
            fetchCompanies();
            fetchServices(); // Call fetchServices here
            fetchInvoices();
        }, []);

    const handleEditClick = (company) => {
        setSelectedCompany(company);
        setShowEditWindow(true);
    };

    const handleEditSubmit = (updatedCompany) => {
        companyService.edit(updatedCompany.id, updatedCompany.name, updatedCompany.vat, updatedCompany.owner, updatedCompany.userId)
            .then(() => {
                setShowEditWindow(false);
                setSelectedCompany(null);
                fetchCompanies();
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
            // Remove the deleted service from the servicesArray
            setServicesArray(servicesArray.filter(service => service.id !== updatedService.id));
        } else {
            // Update the service in the servicesArray
            setServicesArray(
                servicesArray.map(service =>
                    service.id === updatedService.id ? updatedService : service
                )
            );
        }
        // Close the edit window
        setShowServiceEditWindow(false);
    };

    const handleCompanyCreateClick = () => {
        setShowCompanyCreateWindow(!showCompanyCreateWindow);
        };

    const handleServiceCreateClick = () => {
        setShowServiceCreateWindow(!showServiceCreateWindow);
        };

    const handleInvoiceApproval = (invoiceId, isApproved) => {
      invoiceService
        .setApprovalStatus(invoiceId, isApproved)
        .then(() => {
          fetchInvoices();
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
              <CompanyCreate />
            </Modal>
          )}
          {showCompanyCreateWindow && (
              <Modal show={showCompanyCreateWindow} onClose={handleCompanyCreateClick}>
                <CompanyCreate onSubmit={() => {
                  handleCompanyCreateClick();
                  fetchCompanies();
                }} />
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
            {showCompanyCreateWindow && <CompanyCreate />}

            <h2 className="heading">Your Services</h2>
            <button className="create-btn" onClick={handleServiceCreateClick}>Create Service</button>
            {showServiceCreateWindow && (
                <Modal show={showServiceCreateWindow} onClose={handleServiceCreateClick}>
                    <ServiceCreate onClose={() => {
                        handleServiceCreateClick();
                        fetchServices();
                    }} />
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
            {showServiceEditWindow && <ServiceEdit service={selectedService} companies={companiesArray} onSubmit={handleServiceEditSubmit} onClose={() => setShowServiceEditWindow(false)} />}
            {showServiceCreateWindow && <ServiceCreate />}
    </div>
    )
};


