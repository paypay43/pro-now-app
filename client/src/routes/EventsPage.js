import React, { useState, useEffect } from 'react';
import EventsPageView from '../components/Events/EventsPageView.js';
import EventContext from '../contexts/EventContext';
import EventApiService from '../services/event-api-service';

export default function EventsPage(props) {
  const [error, setError] = useState(null);
  const eventContext = React.useContext(EventContext);
  const [events, setEvents] = useState(eventContext.events);

  useEffect(() => {
    EventApiService.getEvents()
      .then(events => {
        eventContext.setEventList(events);
        setEvents(events);
      })
      .catch(eventContext.setError);
  });

  const redirectEvent = id => {};

  return (
    <section className="page container EventsPage">
      <div className="page-section">
        <EventsPageView createEvent={redirectEvent} />
      </div>
    </section>
  );
}
