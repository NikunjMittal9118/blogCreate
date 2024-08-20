import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './HeaderComponent.css';

const HeaderPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('access_token');
    window.location.reload(true);
    navigate('/');
  };

  useEffect(() => {
    // Check for token on component mount
    const token = Cookies.get('access_token');
    if (!token) {
      navigate('/');
    }
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <img src="../../../bat.jpeg" alt="Logo" />
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default HeaderPage;