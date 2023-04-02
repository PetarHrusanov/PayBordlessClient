import React, { useState } from 'react';
import { Service } from './Service';
import { InvoiceCreate } from '../invoices/InvoiceCreate';
import serviceService from "../../services/serviceService";
import Modal from '../shared/Modal';
import SuccessMessage from '../shared/SuccessMessage';
import useFetchData from "../../hooks/useFetchData";

const Services = () => {
//     const [servicesArray, setServicesArray] = useState([]);
    const [servicesArray, setServicesArray, loadingServices] = useFetchData(serviceService.getAll);
    const [showCreateService, setShowCreateService] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleActionClick = (service) => {
        setSelectedService(service);
        setShowCreateService(true);
    };

    const handleClose = () => {
        setShowCreateService(false);
        setSuccessMessage('Invoice Created');
        serviceService
                .getAll()
                .then((fetchedServices) => {
                    setServicesArray(fetchedServices);
                 }).catch((error) => {
                    console.error("Error fetching companies:", error);
                 });
    };

     if (loadingServices) {
        return <div className="loading-container">Loading...</div>;
     }

    return (
        <>
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {servicesArray.map((service) => (
                        <Service key={service.id} {...service} onActionClick={() => handleActionClick(service)} />
                    ))}
                    </tbody>
                </table>
            </div>
            {successMessage && (
                <Modal show={!!successMessage} onClose={() => setSuccessMessage('')}>
                    <SuccessMessage message={successMessage} />
                </Modal>
            )}
            {showCreateService && (
                <Modal show={showCreateService} onClose={handleClose}>
                    <InvoiceCreate
                        companyId={selectedService && selectedService.companyId}
                        serviceId={selectedService && selectedService.id}
                        service={selectedService}
                        onClose={handleClose}
                        onSuccess={(message) => setSuccessMessage(message)}
                    />
                </Modal>
            )}
        </>
    );
};

export default Services;
