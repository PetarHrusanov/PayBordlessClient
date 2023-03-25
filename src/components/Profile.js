import React, { useEffect, useState } from 'react';
import companyService from "../services/companyService";
import {CompanyEdit} from "./companies/CompanyEdit";
import serviceService from "../services/serviceService";
import { ServiceEdit } from "./services/ServiceEdit";


export const Profile = () => {
    const [companiesArray, setCompaniesArray] = useState([]);
    const [showEditWindow, setShowEditWindow] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [servicesArray, setServicesArray] = useState([]); // Add this line
    const [showServiceEditWindow, setShowServiceEditWindow] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const fetchCompanies = () => {
        companyService.getByUserId()
            .then(result => {
                setCompaniesArray(result);
            })
            .catch(error => {
                console.error('Error fetching companies:', error);
            });
    };

    const fetchServices = () => { // Add this function
            serviceService.getAll()
                .then(result => {
                    setServicesArray(result);
                })
                .catch(error => {
                    console.error('Error fetching services:', error);
                });
        };



    useEffect(() => {
            fetchCompanies();
            fetchServices(); // Call fetchServices here
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
      serviceService.edit(updatedService.id, updatedService.name, updatedService.price, updatedService.companyId)
        .then(() => {
          setShowServiceEditWindow(false);
          setSelectedService(null);
          fetchServices();
        })
        .catch(error => {
          console.error('Error updating service:', error);
        });
    };

//     const handleClose = () => {
//         setShowEditWindow(false);
//         fetchCompanies();
//     };

    if (!companiesArray || companiesArray.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
        <h2 className="heading">Your Companies</h2>
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
                                    <button className="edit-btn" onClick={() => handleEditClick({ id, name, vat, owner, userId })}>Edit</button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            {showEditWindow && <CompanyEdit company={selectedCompany} onSubmit={handleEditSubmit} onClose={() => setShowEditWindow(false)} />}
            <h2 className="heading">Your Services</h2>
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
                                                    <button className="edit-btn" onClick={() => handleServiceEditClick({ id, name, price, companyId })}>Edit</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {showServiceEditWindow && <ServiceEdit service={selectedService} companies={companiesArray} onSubmit={handleServiceEditSubmit} onClose={() => setShowServiceEditWindow(false)} />}


        </div>
    )
};


