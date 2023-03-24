import React, { useEffect, useState } from 'react';
import companyService from "../services/companyService";
import { authService } from "../services/authService";

export const Profile = () => {
    const [user, setUser] = useState(null);
    const [companiesArray, setCompaniesArray] = useState([]);

    /*useEffect(() => {
        companyService.getByUserId()
            .then(result =>
                setCompaniesArray(result)
            )
    }, []);*/

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        fetch(`http://localhost:5025/company/GetByUser`, {
            method: 'GET',
            headers: headers,
        })
            .then(response => response.json())
            .then((usefulData) => {
                console.log(usefulData);
                setCompaniesArray(usefulData);
            })
            .catch((e) => {
                console.error(`An error occurred: ${e}`);
            });
    }, []);


    if (!companiesArray || companiesArray.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <h2>Companies:</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>VAT</th>
                    <th>Owner</th>
                    <th>User ID</th>
                </tr>
                </thead>
                <tbody>
                {companiesArray.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.vat}</td>
                        <td>{item.owner}</td>
                        <td>{item.userId}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
