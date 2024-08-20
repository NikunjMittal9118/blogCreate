import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import BlogList from '../../components/BlogList/BlogList.jsx';
import './HomePage.css';
import axios from 'axios';
import HeaderPage from '../../components/Header/HeaderComponent.jsx';

const HomePage = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await axios.get('http://localhost:3000/all');
            setBlogs(response.data);
        };
        fetchBlogs();
    }, []);

    return (
        <div className="home-page">
            <HeaderPage />
            <h1 className="blog-search-title">Blog Search</h1>
            <div className="search-bar-container">
                <SearchBar setBlogs={setBlogs} />
            </div>
            <BlogList blogs={blogs} />
        </div>
    );
};

export default HomePage;
