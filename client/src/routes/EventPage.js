import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EventContext from '../contexts/EventContext';
import EventApiService from '../services/event-api-service';
import EventItem from '../components/Events/EventItem';

export default function EventPage(props) {
  const { match } = props;

  const [event, setEvent] = React.useState(null);

  useEffect(() => {
    EventApiService.getEvent(match.params.id)
      .then(event => {
        setEvent(event);
      })
      .catch(event => {
        console.log(event);
      });
  });
  debugger;

  return (
    <section className="page container EventPage">
      <Link to="/">Go Back</Link>
      <div className="page-section">
        {(event !== null && <EventItem event={event} />) || (
          <div>No Event Found</div>
        )}
        {event !== null && <button>Attend Event</button>}
      </div>
    </section>
  );
}
