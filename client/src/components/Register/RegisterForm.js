import React, { useState } from 'react';
import TokenService from '../../services/token-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthApiService from '../../services/auth-api-service';
import './register.css';

export default function RegisterForm(props) {
  const [error, setError] = useState(null);

  /*const handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    ;
  };*/

  const submitForm = e => {
    e.preventDefault();
    setError(null);
    const { username, password, confirm_password, email } = e.target;

    if (password.value !== confirm_password.value) {
      setError({ ...error, error: 'Passwords do not match' });
      return;
    }

    AuthApiService.postUser({
      username: username.value,
      password: password.value,
      email: email.value
    })
      .then(user => {
        username.value = '';
        password.value = '';
        confirm_password.value = '';
        email.value = '';
        props.onRegistrationSuccess();
      })
      .catch(res => {
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
    <form onSubmit={submitForm} className="register-form app-form">
      <h1>Register</h1>
      <div role="alert">{error && <p className="red">{displayError()}</p>}</div>
      <label className="label-control" htmlFor="username">
        Username
      </label>
      <input
        name="username"
        type="username"
        id="inputUsername"
        className="form-control"
        required
        autoFocus=""
      />
      <label className="label-control" htmlFor="password">
        Password
      </label>
      <input
        name="password"
        type="password"
        id="inputPassword"
        className="form-control"
        required
      />
      <label className="label-control" htmlFor="confirm_password">
        Confirm password
      </label>
      <input
        name="confirm_password"
        type="password"
        id="inputPasswordConfirm"
        className="form-control"
        required
      />
      <label className="label-control" htmlFor="email">
        Email
      </label>
      <input
        name="email"
        type="email"
        id="inputEmail"
        className="form-control"
        required
      />
      <button className="btn" type="submit">
        Register
      </button>
    </form>
  );
}
