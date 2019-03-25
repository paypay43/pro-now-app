import React, { useState, useEffect } from 'react';
import TokenService from '../../services/token-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthApiService from '../../services/auth-api-service';
import EventContext from '../../contexts/EventContext';
import './event.css';
import EventList from './EventList';
import EventForm from './EventForm';

export default function EventsPageView(props) {
  const [error, setError] = useState(null);
  const [view, setView] = useState('list');

  /*const handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    ;
  };*/

  const displayError = () => {
    return Object.keys(error).map(e => {
      return (
        <span key={e}>
          {e}: {error[e]}
        </span>
      );
    });
  };

  const createEventAction = () => {
    setView('form');
  };

  const successCreate = () => {
    props.createEvent();
  };

  const changeView = () => {
    setView('list');
  };

  const renderButton = () => {
    if (view === 'list')
      return (
        <button
          onClick={createEventAction}
          className="btn form-control create-new"
        >
          Create Event
        </button>
      );
    else
      return (
        <button onClick={changeView} className="btn form-control go-back">
          Go Back
        </button>
      );
  };

  return (
    <div>
      <h2 className="center">Events</h2>
      <section className="events-main">
        <div className="filter-options">
          <span>
            <FontAwesomeIcon className="black" icon="search" />
          </span>
          <input
            className="search form-control"
            placeholder="Search"
            type="search"
          />
          <span className="form-control center location">Washington D.C.</span>
          {renderButton()}
        </div>
        {(view === 'list' && <EventList />) || (
          <EventForm changeView={changeView} create={props.createEvent} />
        )}
      </section>
    </div>
  );
}
