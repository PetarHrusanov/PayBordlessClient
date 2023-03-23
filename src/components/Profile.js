import React, { useEffect, useState } from 'react';
import { getCompaniesByUser, getUser } from './api';

function Profile() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // Get user's companies
            const companyData = await getCompaniesByUser();
            setCompanies(companyData);
        }
        fetchData();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile: {user.name}</h1>
            <h2>Companies:</h2>
            <ul>
                {companies.map((company) => (
                    <li key={company.id}>{company.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Profile;
