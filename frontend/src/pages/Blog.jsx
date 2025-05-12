import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchBlogs();
    fetchCurrentUser();
  }, []);

  const fetchBlogs = () => {
    fetch("http://localhost:3000/api/blogs", {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.log("Failed to load blogs", err));
  };

  const fetchCurrentUser = () => {
    fetch("http://localhost:3000/api/auth/user", {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log("Failed to fetch user", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      fetch(`http://localhost:3000/api/blogs/${id}`, {
        method: 'DELETE',
        credentials: 'include', // Authenticated request
      })
        .then(res => res.json())
        .then(() => fetchBlogs())
        .catch(err => console.error("Delete failed", err));
    }
  };

  return (
    <div className="container-fluid py-5 px-5 mt-5 text-white bg-black">
      <h2 className="text-warning text-center mb-4">📝 My Blog</h2>
      <div className="row">
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            onDelete={handleDelete}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;

