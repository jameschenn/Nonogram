
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
              Add Image
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
          </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
