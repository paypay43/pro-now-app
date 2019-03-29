import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//

export default function EventItem(props) {
  const { event } = props;

  return (
    <li className="event-list-item">
      <Link to={`/event/${event.id}`} className="">
        <header className="EventListItem__header">
          <h2 className="EventListItem__heading">{event.event_name}</h2>
        </header>
        <section className="event-main-info">
          <div>
            <b>Description:</b> {event.description}
          </div>
          <div>
            <b>Location:</b> {event.location}
          </div>
          <div>
            <b>Created by:</b> {event.user.username}
          </div>
          <div>
            <b>Date:</b> <Moment format="YYYY/MM/DD">{event.date}</Moment>
          </div>
        </section>
        <footer className="EventListItem__footer">
          <b>Created:</b>{' '}
          <Moment fromNow ago>
            {event.date_created}
          </Moment>{' '}
          ago
        </footer>
      </Link>
    </li>
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
