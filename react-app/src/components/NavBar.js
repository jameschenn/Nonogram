
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav>
      <div className='nav-links'>
        <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              <span style={{fontWeight: 'bold'}}>Nonogram</span>
            </NavLink>
          </li>
          {/* <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li> */}
          {sessionUser && (
          <>
          <li>
            <NavLink to='/images/upload' exact={true} activeClassName='active'>
              <i class="fa-solid fa-circle-plus"></i>
            </NavLink>
          </li>
          <li>
          {/* <div>
            <details>
              <summary>Test</summary>
              <a href={`/me`}>Profile</a>
              <a href={`/me/edit`}>Settings</a>
            <LogoutButton />
            </details>
          </div> */}




          <div class='profile-dropdown'>
            <button><img src={sessionUser?.profilePictureUrl} alt={sessionUser?.username} /></button>
              <div class="dropdown-content">
                    <a href={`/me`}>Profile <i class="fa-solid fa-user"></i></a>
                    <a href={`/me/edit`}>Settings <i class="fa-solid fa-gear"></i></a>
                <LogoutButton />
              </div>
          </div>
          </li>
          </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
