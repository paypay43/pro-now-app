import React, { Component } from 'react';
import LoginForm from '../components/Login/LoginForm';

export default function LoginPage(props) {
  const location = props.location || {};
  const history = props.history || {
    push: () => {}
  };

  const handleLoginSuccess = () => {
    ;
    const destination = (location.state || {}).from || '/';
    history.push(destination);
  };

  return (
    <section className="page LoginPage">
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </section>
  );
}
