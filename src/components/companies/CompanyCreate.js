import {useState} from "react";
import {requestInterceptor} from "../../services/requestInterceptor";

const CompanyCreate = () => {
    const [name, setName] = useState('');
    const [vat, setVat] = useState('');
    const [owner, setOwner] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleVatChange = (event) => {
        setVat(event.target.value);
    };

    const handleOwnerChange = (event) => {
        setOwner(event.target.value);
    };

    const handleSubmit = async (event) => {
        console.log('handleSubmit called');
        event.preventDefault();

        // Validate form data
        if (!name) {
            alert('Please enter a name for the company');
            return;
        }

        if (!vat || isNaN(vat)) {
            alert('Please enter a valid VAT number');
            return;
        }

        if (!owner) {
            alert('Please enter the name of the company owner');
            return;
        }

        try {
            const request = requestInterceptor();
            const data = { name, vat, owner };
            await request.post('http://localhost:5025/company/upload', data);
            alert('Company created successfully!');
        } catch (error) {
            console.error(error);
            alert('An error occurred while creating the company');
        }
    };

    return (
        <div className="create-company">
            <h2>Create Company</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={handleNameChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="vat">VAT:</label>
                    <input type="number" id="vat" value={vat} onChange={handleVatChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="owner">Owner:</label>
                    <input type="text" id="owner" value={owner} onChange={handleOwnerChange} required />
                </div>
                <button type="submit">Create Company</button>
            </form>
        </div>
    );
};

export default CompanyCreate;
