import React from 'react';

const UserContext = React.createContext({
  loggedIn: false,
  setLoggedIn: () => {}
});

export default UserContext;
