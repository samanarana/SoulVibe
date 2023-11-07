import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import PageNav from './PageNav';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="nav-container">

          <h1 className="nav-title">
            <NavLink exact to="/" className="nav-home-link">SoulVibe</NavLink>
          </h1>

          {isLoaded && (
            <div className="profile-container">
              <ProfileButton user={sessionUser} />
            </div>
          )}

        </div>
      </nav>

      <PageNav />
    </div>
  );
}

export default Navigation;
