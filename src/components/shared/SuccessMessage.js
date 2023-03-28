import React from 'react';

const SuccessMessage = ({ message }) => {
  return (
    <div className="success-message">
      <span>{message}</span>
    </div>
  );
};

export default SuccessMessage;
