import React from 'react';
import { NavLink } from 'react-router-dom';
import './PageNav.css';

const pageRoutes = [
    { path: '/exercise', name: 'Exercise', icon: '/icons/exercise.png' },
    { path: '/nutrition', name: 'Nutrition', icon: '/icons/nutrition.png' },
    { path: '/meditation', name: 'Meditation', icon: '/icons/meditation.png' },
    { path: '/journal', name: 'Journal', icon: '/icons/journal.png' },
    { path: '/resource', name: 'Resources', icon: '/icons/resources.png' },
];

function PageNav() {
  return (
    <nav className="page-nav">
      {pageRoutes.map((page) => (
        <NavLink key={page.name} to={page.path} className="page-item" activeClassName="active">
          <img src={page.icon} alt={`${page.name} icon`} className="page-icon" />
        </NavLink>
      ))}
    </nav>
  );
}

export default PageNav;
