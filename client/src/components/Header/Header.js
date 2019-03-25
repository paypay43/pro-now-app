import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './Header.css';

export default function Header(props) {
  const userContext = React.useContext(UserContext);
  //const [loggedIn, setLogged] = useState(userContext.loggedIn);

  const renderLogoutLink = () => {
    return (
      <ul className="logged-out">
        <li className="logged-in">
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    );
  };

  const handleLogout = () => {
    TokenService.clearAuthToken();
    userContext.setLogged(false);
  };

  const renderLoginLink = () => {
    return (
      <ul className="logged-out">
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Log in</Link>
        </li>
      </ul>
    );
  };

  return (
    <UserContext.Consumer>
      {value => {
        return (
          <nav className="sticky-top">
            <div class="navbar-flex">
              <h3>
                <FontAwesomeIcon className="black" icon="fist-raised" />
                <Link to="/">ProtestNow</Link>
              </h3>
              {value.loggedIn ? renderLogoutLink() : renderLoginLink()}
            </div>
          </nav>
        );
      }}
    </UserContext.Consumer>
  );
}
