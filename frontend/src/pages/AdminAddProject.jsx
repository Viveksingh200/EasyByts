import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function AdminAddProject() {
    const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '',
    techStack: '',
    liveLink: '',
    githubLink: ''
  });

  const [formValidated, setFormValidated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("failed to load projects", err));
  }, []);

  const handleChange = (event) => {
    setNewProject((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormValidated(true);

    // Check form validity
    if (event.currentTarget.checkValidity() === false) {
      return;
    }

    const formattedProject = {
      ...newProject,
      techStack: newProject.techStack.split(",").map((tech) => tech.trim())
    };

    fetch("http://localhost:3000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
       credentials: 'include',
      body: JSON.stringify(formattedProject)
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects([...projects, data.project]);
        alert('Project added successfully!');
        setNewProject({
          title: '',
          description: '',
          image: '',
          techStack: '',
          liveLink: '',
          githubLink: ''
        });
        navigate('/projects');
      })
      .catch((err) => {
        console.error("failed to add project", err);
        alert('Failed to add project!');
      });
  };

  return (
    <div className="container-fluid mt-5 text-white bg-black p-4 rounded">
      <h2 className="mb-4 mt-4 text-center text-warning">Manage Projects</h2>

      {/* Project Form */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className={`needs-validation ${formValidated ? "was-validated mb-4" : ""}`}
      >
        <div className="mb-3">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newProject.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            name="description"
            placeholder="Description"
            value={newProject.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProject.image}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Display the image preview */}
        {newProject.image && (
          <div className="mb-3">
            <img src={newProject.image} alt="Project" style={{ maxWidth: "100%", maxHeight: "200px" }} />
          </div>
        )}

        <div className="mb-3">
          <input
            type="text"
            name="techStack"
            placeholder="Tech Stack (comma separated)"
            value={newProject.techStack}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="liveLink"
            placeholder="Live Link"
            value={newProject.liveLink}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="githubLink"
            placeholder="GitHub Link"
            value={newProject.githubLink}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-warning">
          Add Project
        </button>
      </form>
    </div>
  );
}

export default AdminAddProject;
