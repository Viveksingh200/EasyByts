import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard.jsx";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchProjects();
    fetchCurrentUser();
  }, []);

  const fetchProjects = () => {
    fetch("http://localhost:3000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to load projects", err));
  };

  const fetchCurrentUser = () => {
    fetch("http://localhost:3000/api/auth/user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log("Failed to fetch user", err));
  };

  return (
    <div className="container-fluid bg-black text-white py-5 px-5 mt-5">
      <h1 className="text-center mb-4 text-warning">My Projects</h1>
      <div className="row">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            currentUser={currentUser}
            onProjectUpdate={fetchProjects}
          />
        ))}
      </div>
    </div>
  );
}
