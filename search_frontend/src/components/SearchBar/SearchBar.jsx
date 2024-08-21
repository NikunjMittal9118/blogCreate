import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css'

const SearchBar = ({ setBlogs, setResponseTime, setTotalResults }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/search?q=${query}`);
            setBlogs(response.data.searchDocuments);
            console.log(response.data.searchDocuments.length)
            setTotalResults(response.data.searchDocuments.length);
            setResponseTime(response.data.responseTime);

        } catch (error) {
            console.error('Search error:', error);
        }
    };

    return (
        <div className='search-bar'>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search blogs..."
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;