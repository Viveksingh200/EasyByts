import React, { useState } from "react";
import "./ProjectCard.css";

function ProjectCard({ project, currentUser, onProjectUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState({
    ...project,
    techStack: project.techStack.join(", ")
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/projects/${project._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...editedProject,
        techStack: editedProject.techStack.split(",").map((t) => t.trim()),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Project updated successfully!");
        setIsEditing(false);
        onProjectUpdate();
      })
      .catch((err) => {
        console.error("Update failed", err);
        alert("Update failed");
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      fetch(`http://localhost:3000/api/projects/${project._id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((res) => res.json())
        .then(() => {
          alert("Project deleted");
          onProjectUpdate();
        })
        .catch((err) => {
          console.error("Delete failed", err);
          alert("Delete failed");
        });
    }
  };

  const isAuthorized =
    currentUser &&
    (currentUser.isAdmin || project.author?._id === currentUser._id);

  return (
    <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
      <div className="card h-100">
        {project.image ? (
          <img
            src={project.image}
            className="card-img-top"
            alt={project.title}
            style={{ height: "20rem", objectFit: "cover" }}
          />
        ) : (
          <div
            className="bg-secondary text-white d-flex align-items-center justify-content-center"
            style={{ height: "20rem" }}
          >
            No Image
          </div>
        )}

        <div className="card-body bg-dark text-white">
          {isEditing ? (
            <form onSubmit={handleEditSubmit}>
  <div className="mb-2">
    <label className="form-label text-white">Title</label>
    <input
      className="form-control"
      type="text"
      name="title"
      value={editedProject.title}
      onChange={handleChange}
    />
  </div>

  <div className="mb-2">
    <label className="form-label text-white">Description</label>
    <textarea
      className="form-control"
      name="description"
      value={editedProject.description}
      onChange={handleChange}
    />
  </div>

  <div className="mb-2">
    <label className="form-label text-white">Image URL</label>
    <input
      className="form-control"
      type="text"
      name="image"
      value={editedProject.image}
      onChange={handleChange}
    />
  </div>

  <div className="mb-2">
    <label className="form-label text-white">Tech Stack (comma-separated)</label>
    <input
      className="form-control"
      type="text"
      name="techStack"
      value={editedProject.techStack}
      onChange={handleChange}
    />
  </div>

  <div className="mb-2">
    <label className="form-label text-white">Live Link</label>
    <input
      className="form-control"
      type="text"
      name="liveLink"
      value={editedProject.liveLink}
      onChange={handleChange}
    />
  </div>

  <div className="mb-2">
    <label className="form-label text-white">GitHub Link</label>
    <input
      className="form-control"
      type="text"
      name="githubLink"
      value={editedProject.githubLink}
      onChange={handleChange}
    />
  </div>

  <button className="btn btn-success btn-sm me-2" type="submit">Save</button>
  <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>Cancel</button>
</form>
          ) : (
            <>
              <h5 className="card-title text-white">{project.title}</h5>
              <p className="card-text">{project.description}</p>
              <div className="mb-2">
                {project.techStack.map((tech, index) => (
                  <span key={index} className="badge bg-secondary me-1">
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.liveLink}
                className="btn btn-warning btn-sm me-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live
              </a>
              <a
                href={project.githubLink}
                className="btn btn-outline-light btn-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <p className="text-light">
                Created by: {project.author?.username || "Unknown Author"}
              </p>
              {isAuthorized && (
                <div>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
