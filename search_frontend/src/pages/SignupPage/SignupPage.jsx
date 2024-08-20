import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SignupPage.css'; // Optional, for custom styles

const SignupPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
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
      const response = await axios.post('http://localhost:3000/api/auth/register', formData, {
        headers: {
          'X-TYPESENSE-API-KEY': 'abcd1234-efgh-5678-ijkl-9012mnopqrst',
          'Content-Type': 'application/json'
        }
      });
      console.log('Signup successful:', response.data);
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err);
      setError('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h1>Signup</h1>
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
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter Email'
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
        <button type="submit">Sign Up</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default SignupPage;
