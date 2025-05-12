import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditBlog() {
  const { id } = useParams();  // Get the blog ID from the URL params
  const navigate = useNavigate();  // To navigate to another page after updating
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    tags: ''
  });

  // Fetch the blog data when the component mounts or when ID changes
  useEffect(() => {
    fetch(`http://localhost:3000/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        setBlogData({
          title: data.title,
          content: data.content,
          tags: data.tags.join(', ')  // Join tags into a comma-separated string
        });
      })
      .catch(err => console.error('Failed to load blog:', err));
  }, [id]);

  const handleChange = (e) => {
    setBlogData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sending the updated blog data to the backend
    fetch(`http://localhost:3000/api/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        ...blogData,
        tags: blogData.tags.split(',').map(tag => tag.trim())  // Process tags into array
      })
    })
      .then(res => res.json())
      .then(() => navigate('/blog'))  // Redirect to blog list after success
      .catch(err => console.error('Failed to update blog:', err));  // Error handling
  };

  return (
    <div className="container-fluid mt-5 text-white bg-black p-4 rounded">
      <h2 className="mb-4 text-warning">✏️ Edit Blog</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            placeholder="Blog Title"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            name="content"
            value={blogData.content}
            onChange={handleChange}
            placeholder="Blog Content"
            className="form-control"
            rows="10"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="tags"
            value={blogData.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-warning">Update Blog</button>
      </form>
    </div>
  );
}

export default EditBlog;
