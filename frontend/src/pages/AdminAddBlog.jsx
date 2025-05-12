import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminAddBlog.css';
import draftToHtml from 'draftjs-to-html';
import { useNavigate } from 'react-router-dom';

function AdminAddBlog() {
  const navigate = useNavigate();
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '', // content will be in HTML format
    tags: '',
  });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [formValidated, setFormValidated] = useState(false);

  const handleChange = (event) => {
    setNewBlog((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormValidated(true);

    // Check if the editor has content
    const editorContent = editorState.getCurrentContent();
    if (!editorContent.hasText()) {
      alert('Content cannot be empty!');
      return;
    }

    if (event.currentTarget.checkValidity() === false) {
      return;
    }

    // Convert the editor content to raw JSON
    const rawContent = convertToRaw(editorContent);
    const contentHTML = draftToHtml(rawContent);

    const formattedBlog = {
      ...newBlog,
      title: newBlog.title,
      content: contentHTML, // Store the content as HTML
      tags: newBlog.tags.split(',').map((tag) => tag.trim()),
      createdAt: new Date().toISOString(), // Set the current timestamp
    };

    // Make the API request to save the blog
    fetch("http://localhost:3000/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
       credentials: 'include',
      body: JSON.stringify(formattedBlog),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Blog created:", data);
        alert('Blog added successfully!'); 
        setNewBlog({
          title: '',
          content: '',
          tags: '',
        });
        navigate('/blog');
        setEditorState(EditorState.createEmpty());
      })
      .catch((err) => {
        console.error("Failed to add blog", err);
        alert('Error: Failed to add blog!'); // Error message
      });
  };

  return (
    <div className="container-fluid mt-5 text-white bg-black p-4 rounded">
      <h2 className="mb-4 mt-4 text-center text-warning">Manage Blog</h2>

      {/* Blog Form */}
      <form onSubmit={handleSubmit} noValidate className={`needs-validation ${formValidated ? 'was-validated mb-4' : ''}`}>
        <div className="mb-3">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newBlog.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Rich Text Editor for Content */}
        <div className="mb-3">
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={handleEditorChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={newBlog.tags}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-warning">
          Add Blog
        </button>
      </form>
    </div>
  );
}

export default AdminAddBlog;
