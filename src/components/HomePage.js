import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container">
            <h1 className="intro-heading">PayBordLess</h1>
            <p className="intro-subheading">
                A seamless platform for generating and managing invoices.
            </p>
            <p className="intro-description">
                Browse through our partner companies, create invoices, and automate
                your payment process with just a few clicks. Join us today and
                experience the convenience of PayBordLess.
            </p>
            <Link to="/companies">
                <button className="browse-companies-btn">
                    Browse Companies
                </button>
            </Link>
        </div>
    );
};

export default HomePage;
