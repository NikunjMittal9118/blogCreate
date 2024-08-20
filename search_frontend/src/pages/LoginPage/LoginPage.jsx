import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', formData, {
        headers: {
            'X-TYPESENSE-API-KEY': 'abcd1234-efgh-5678-ijkl-9012mnopqrst',
            'Content-Type': 'application/json',
        },
        withCredentials: true, // This is important for cookies
      });
      console.log('Login successful:', response);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder='Enter Username'
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter Password'
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;
