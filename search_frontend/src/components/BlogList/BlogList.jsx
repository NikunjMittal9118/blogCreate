import React from 'react';
import BlogCard from '../BlogCard/BlogCard.jsx';
import './BlogList.css';

const BlogList = ({ blogs }) => {
    return (
        <div className="blog-list">
            {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default BlogList;
