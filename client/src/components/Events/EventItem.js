import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//

export default function EventItem(props) {
  const { event } = props;
  debugger;
  console.log(event);
  return (
    <Link to={`/event/${event.id}`} className="EventListItem">
      <header className="EventListItem__header">
        <h2 className="EventListItem__heading">{event.event_name}</h2>
      </header>
      <section className="event-main-info">
        <div>Description: {event.description}</div>
        <div>Location: {event.location}</div>
        <div>Created by: {event.user.username}</div>
        Created:{' '}
        <Moment fromNow ago>
          {event.date_created}
        </Moment>
      </section>
      <footer className="EventListItem__footer" />
    </Link>
  );
}

/*function EventStyle({ event }) {
  return (
    <span className="EventListItem__style">
      <StyleIcon style={event.style} /> {event.style}
    </span>
  );
}

function EventDate({ event }) {
  return (
    <span className="EventListItem__date">
      <NiceDate date={event.date_created} />
    </span>
  );
}

function EventAuthor({ event }) {
  return (
    <span className="EventListItem__author">{event.author.full_name}</span>
  );
}

function EventCommentCount({ event }) {
  return (
    <span className="EventListItem__comment-count fa-layers fa-fw">
      <FontAwesomeIcon size="lg" icon="comment" />
      <span className="fa-layers-text fa-inverse">
        {event.number_of_comments}
      </span>
    </span>
  );
}*/
