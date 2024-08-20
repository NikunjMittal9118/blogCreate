import React from 'react';
import './BlogCard.css';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    return (
        <div className="blog-card">
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-excerpt">{blog.excerpt}</p>
            
            <div className="blog-details">
                <span className="blog-rating">⭐ {blog.rating} / 5</span>
                <span className="blog-time">🕒 {new Date(blog.publishedAt).toLocaleDateString()}</span>
                <span className="blog-views">👁️ {blog.views} views</span>
            </div>
            
            <Link to={`/searchBlog/${blog.id}`} className="read-more">Read More</Link>
        </div>
    );
};

export default BlogCard;
