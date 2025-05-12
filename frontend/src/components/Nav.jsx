import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import Image3 from "../assets/images/Image3.png";
import { isAuthenticated, logoutUser } from '../utils/auth';  // import auth utils

export default function Nav() {
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  const navigate = useNavigate();


useEffect(() => {
  const updateAuthStatus = () => {
    setIsAuthenticatedState(isAuthenticated());
  };

  updateAuthStatus(); // Check on mount
  window.addEventListener("authChange", updateAuthStatus);

  return () => {
    window.removeEventListener("authChange", updateAuthStatus);
  };
}, []);

  const handleLogout = () => {
    logoutUser();  // Log out the user
    setIsAuthenticatedState(false);  // Update the state to reflect logout
    navigate('/');  // Redirect to the homepage
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5 nav-tab fixed-top">
        <NavLink className="navbar-brand" to="/">
          <Avatar alt="Vivek Singh" src={Image3} />
        </NavLink>
        <NavLink className="navbar-brand yellow" to="/">Vivek Singh</NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse nav-items" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                className={(e) => e.isActive ? "nav-link yellow" : "nav-link"}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(e) => e.isActive ? "nav-link yellow" : "nav-link"}
                to="/projects"
              >
                Projects
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(e) => e.isActive ? "nav-link yellow" : "nav-link"}
                to="/blog"
              >
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(e) => e.isActive ? "nav-link yellow" : "nav-link"}
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
            <li className="nav-item" style={{display: "flex"}}>
              {!isAuthenticatedState ? (
                <>
                  <NavLink
                    className={(e) => e.isActive ? "nav-link yellow" : "nav-link"}
                    to="/signup"
                  >
                    Signup
                  </NavLink>
                  <NavLink
                    className={(e) => e.isActive ? "nav-link yellow" : "nav-link"}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </>
              ) : (
                <NavLink
                  className="nav-link yellow"
                  to="/admin"
                >
                  Dashboard
                </NavLink>
              )}
            </li>
            {isAuthenticatedState && (
              <li className="nav-item">
                <button className="nav-link yellow" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
