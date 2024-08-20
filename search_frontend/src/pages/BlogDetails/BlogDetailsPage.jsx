import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BlogDetailsPage.css';
import { useParams } from 'react-router-dom';

const BlogDetailsPage = () => {
  const [blogData, setBlogData] = useState(null);
  const [error, setError] = useState(null); // To handle errors
  const { id } = useParams(); // Extract id from URL parameters

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/searchBlog/${id}`);
        setBlogData(response.data); // Set the blog data
      } catch (error) {
        setError('Error fetching blog data'); // Handle errors
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogData();
  }, [id]); // Depend on id

  if (error) return <div>{error}</div>; // Display error if any

  if (!blogData) return <div>Loading...</div>; // Show loading state while data is being fetched

  return (
    <div className="blog-details-page">
      <h1>{blogData.title}</h1>
      <p>{blogData.content}</p>
    </div>
  );
};

export default BlogDetailsPage;
