import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column vh-100 bg-light p-3" style={{ width: '200px' }}>
      <h3>Studia Portal</h3>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link btn btn-outline-primary text-start" to="/parent">Parent</Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link btn btn-outline-primary text-start" to="/student">Student</Link>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;