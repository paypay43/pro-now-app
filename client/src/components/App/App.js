import React, { Fragment, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import LoginPage from '../../routes/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage';
import EventsPage from '../../routes/EventsPage.js';
import EventPage from '../../routes/EventPage';
import UserContext from '../../contexts/UserContext';
import EventContext from '../../contexts/EventContext';
import TokenService from '../../services/token-service';

//import EventListView from '../Event/List';
//import PrivateRoute from '../Utils/PrivateRoute.js';
//import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
//import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import './App.css';

function App() {
  const [loggedIn, setLogged] = useState(TokenService.hasAuthToken);

  const setLoggedFunc = value => {
    userContext.loggedIn = true;
    setLogged(true);
  };

  const userContext = {
    loggedIn,
    setLoggedIn: () => setLoggedFunc()
  };

  const eventContext = {
    events: [],
    setEventList: newEvents => {
      eventContext.events = newEvents;
    }
  };
  return (
    <UserContext.Provider value={userContext}>
      <Fragment>
        <Header />
        <main role="main">
          <Switch>
            <Route path={'/login'} component={LoginPage} />
            <Route path={'/register'} component={RegistrationPage} />
            <EventContext.Provider value={eventContext}>
              <Route exact path={'/'} component={EventsPage} />
              <Route path={'/event/:id'} component={EventPage} />
            </EventContext.Provider>
          </Switch>
        </main>
      </Fragment>
    </UserContext.Provider>
  );
}

export default App;
