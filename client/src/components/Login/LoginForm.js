import React, { useState } from 'react';
import TokenService from '../../services/token-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';
import './Login.css';

export default function LoginForm(props) {
  const userContext = React.useContext(UserContext);
  ;
  const [error, setError] = useState(null);

  const handleSubmitJwtAuth = ev => {
    ;
    ev.preventDefault();
    setError(null);
    const { username, password } = ev.target;

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then(res => {
        ;
        username.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        userContext.setLoggedIn(true);
        props.onLoginSuccess();
        ;
      })
      .catch(res => {
        ;
        setError({ error: res.error });
      });
  };

  const displayError = () => {
    return Object.keys(error).map(e => {
      return (
        <span key={e}>
          {e}: {error[e]}
        </span>
      );
    });
  };

  return (
    <form className="login-form app-form" onSubmit={handleSubmitJwtAuth}>
      <FontAwesomeIcon
        className="black big-icon form-icon"
        icon="fist-raised"
      />
      <h1>Please sign in</h1>
      <div role="alert">{error && <p className="red">{displayError()}</p>}</div>

      <input
        type="username"
        name="username"
        id="inputUsername"
        class="form-control"
        placeholder="Username"
        required=""
        autofocus=""
      />

      <input
        type="password"
        name="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required=""
      />
      <button className="btn" type="submit">
        Login
      </button>
    </form>
  );
}
