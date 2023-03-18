import React from 'react';
import companiesDummy from '../dummy-data/companies-dummy.json';
import {Company} from './Company'
import {Link} from "react-router-dom";

const Companies = () => {

    const onInfoClick = (company) => {
        console.log('Company info clicked:', company);
    };

    return (
        <>
            <div className="create-button">
                <Link to="/company-create">
                    <button>Create Company</button>
                </Link>
            </div>
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>VAT</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {companiesDummy.companies.map((company) => (
                        <Company
                            key={company.id}
                            {...company}
                            onInfoClick={onInfoClick}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Companies;
