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
    debugger;
    return events.map(event => {
      return <EventItem event={event} />;
    });
  };

  const renderEmpty = () => {
    return <h1>No Events Found</h1>;
  };

  return (
    <EventContext.Consumer>
      {value => {
        console.log(value);
        debugger;
        return (
          <div className="event-list">
            {(value.events.length !== 0 && renderEvents(value.events)) ||
              renderEmpty()}
          </div>
        );
      }}
    </EventContext.Consumer>
  );
}
