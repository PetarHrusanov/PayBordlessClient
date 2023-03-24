export const CompanyDetails = ({ company, onClose }) => {
    return (
        <div className="overlay">
            <div className="backdrop"></div>
            <div className="modal">
                <div className="detail-container">
                    <header className="headers">
                        <h2>Company Detail</h2>
                        <button className="btn close" onClick={onClose}>
                            {/* Existing close button content */}
                        </button>
                    </header>
                    <div className="content">
                        <div className="company-details">
                            <p>Company ID: <strong>{company.id}</strong></p>
                            <p>Name: <strong>{company.name}</strong></p>
                            <p>VAT: <strong>{company.vat}</strong></p>
                            <p>Owner: <strong>{company.owner}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

