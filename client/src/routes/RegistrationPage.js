import React, { useState, useEffect } from 'react';
import RegistrationForm from '../components/Register/RegisterForm';

export default function RegistrationPage(props) {
  const history = {
    push: () => {}
  };

  const handleRegistrationSuccess = user => {
    const { history } = props;
    history.push('/login');
  };
  return (
    <section className="page RegistrationPage">
      <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
    </section>
  );
}
