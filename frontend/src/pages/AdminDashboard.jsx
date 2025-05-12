import React from 'react';
import { NavLink } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="container-fluid py-5 px-5 text-white bg-black mt-5 text-center" style={{height: "100vh"}}>
        <div className="mx-5">
      <h2 className='text-warning'>Admin Dashboard</h2>
        <ul className="list-group mt-4">
            <li className="list-group-item bg-dark text-white">
                <NavLink to="/admin/projects" className="text-decoration-none text-white">Add New Projects</NavLink>
            </li>
            <li className="list-group-item bg-dark text-white">
                <NavLink to="/admin/blog" className="text-decoration-none text-white">Add New Blogs</NavLink>
            </li>
            <li className="list-group-item bg-dark text-white">
                <NavLink to="/admin/contacts" className="text-decoration-none text-white">View Contact Messages</NavLink>
            </li>
        </ul>
        </div>
    </div>
  );
}
