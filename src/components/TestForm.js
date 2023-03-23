import React from 'react';

const TestForm = () => {
    const handleSubmit = (event) => {
        console.log('handleSubmit called');
        event.preventDefault();
    };

    return (
        <div>
            <h2>Test Form</h2>
            <form onSubmit={handleSubmit}>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default TestForm;
