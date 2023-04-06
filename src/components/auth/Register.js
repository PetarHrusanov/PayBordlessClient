import React, { useState } from 'react';
import { authService } from '../../services/authService';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setNameError('Name is required');
      return;
    }

    if (!isPasswordValid(password)) {
      setPasswordError('Password must include at least one number and one special character.');
      return;
    }

    try {
      await authService.register(name, email, password);
      window.location.href = '/';
    } catch (err) {
      console.error(err);
    }
  };

  const isPasswordValid = (password) => {
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.length === 0) {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!isPasswordValid(e.target.value)) {
      setPasswordError('Password must include at least one number and one special character.');
    } else {
      setPasswordError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label className="form-label">Email</label>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
      <label className="form-label">Password</label>
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} className="form-input" />
      {passwordError && <p className="error">{passwordError}</p>}
      <label className="form-label">Name</label>
      <input type="text" placeholder="Name" value={name} onChange={handleNameChange} className="form-input" />
      {nameError && <p className="error">{nameError}</p>}
      <button type="submit" className="create-button button">Register</button>
    </form>
  );
};

export default Register;
