import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthApiService from '../../services/auth-api-service';
import EventContext from '../../contexts/EventContext';
import EventItem from './EventItem';
import './event.css';

export default function EventList(props) {
  const eventContext = React.useContext(EventContext);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState(eventContext.events);

  /*const handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    ;
  };*/

  const renderEvents = events => {
    return events.map(event => {
      return <EventItem key={event.id} event={event} />;
    });
  };

  const renderEmpty = () => {
    return <h2>No Events Found</h2>;
  };

  return (
    <EventContext.Consumer>
      {value => {
        return (
          <ul className="event-list">
            {(value.events.length !== 0 && renderEvents(value.events)) ||
              renderEmpty()}
          </ul>
        );
      }}
    </EventContext.Consumer>
  );
}
