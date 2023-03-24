import React, { useEffect, useState } from 'react';
import companyService from "../services/companyService";
import {CompanyEdit} from "./companies/CompanyEdit";

export const Profile = () => {
    const [user, setUser] = useState(null);
    const [companiesArray, setCompaniesArray] = useState([]);
    const [showEditWindow, setShowEditWindow] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const fetchCompanies = () => {
        companyService.getByUserId()
            .then(result => {
                setCompaniesArray(result);
            })
            .catch(error => {
                console.error('Error fetching companies:', error);
            });
    };

    useEffect(() => {
        fetchCompanies();
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

    const handleClose = () => {
        setShowEditWindow(false);
        fetchCompanies();
    };

    if (!companiesArray || companiesArray.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <h2>Companies:</h2>
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
        </div>
    )
};


