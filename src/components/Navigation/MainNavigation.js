import React from 'react';
import { NavLink } from 'react-router-dom'

import AuthContext from '../../context/auth-context'

import './MainNavigation.css'

const mainNavigation = props => (
  <AuthContext.Consumer>
    {(context) => {
      return (
      <header className="main-navigation">
        <div className="main-navigation__logo">
          <h2>Fluent Truant</h2>
        </div>
        <nav className="main-navigation__items">
          <ul>
            {!context.token && (<li>
              <NavLink to="/auth">Authenticate</NavLink>
            </li>
            )}
            <li><NavLink to="/lessons">Lessons</NavLink></li>
            {!context.token && (
            <li>
              <NavLink to="/create-lesson">Create Lessons</NavLink>
            </li>
            )}
            <li>
              <NavLink to="/text-lesson">Text Lessons</NavLink>
            </li>
            {context.token && (
              <React.Fragment>
                <li>
                  <button onClick={context.logout}>Logout</button>
                </li>
              </React.Fragment>
            )}
            
          </ul>
        </nav>
      </header>
      );
    }
  }
  </AuthContext.Consumer>
)
export default mainNavigation;
