import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TokenService from '../services/token-service';
import EventContext from '../contexts/EventContext';
import EventApiService from '../services/event-api-service';
import EventItem from '../components/Events/EventItem';
import CommentForm from '../components/Comment/CommentForm';

export default function EventPage(props) {
  const { match } = props;
  let user;
  const [event, setEvent] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [isAttending, setAttending] = React.useState(null);

  useEffect(() => {
    EventApiService.getEvent(match.params.id)
      .then(event => {
        setEvent(event);
        //let eventSubs =  EventApiService.getSubscriptions(match.params.id);
        //let eventComments = EventApiService.getEventComments(match.params.id);
        return Promise.all([
          EventApiService.getSubscriptions(match.params.id),
          EventApiService.getEventComments(match.params.id)
        ]);
      })
      .then(data => {
        user = TokenService.readJwtToken();
        let attend = false;
        let subs = data[0];
        let comments = data[1];
        for (let i = 0; i < subs.length; i++) {
          if (subs[i].user_id === user.user_id) {
            if (subs[i].status === 'ATTENDING') {
              attend = true;
            }
            break;
          }
        }
        setAttending(attend);
        setComments(comments);
      })
      .catch(event => {});
  }, []);

  const subscribeEvent = () => {
    EventApiService.subscribeEvent(match.params.id).then(value => {
      if (value.status === 'ATTENDING') {
        setAttending(true);
      } else {
        setAttending(false);
      }
    });
  };

  const generateSubButton = () => {
    if (isAttending) {
      return (
        <button className="btn go-back" onClick={subscribeEvent}>
          Unsubscribe
        </button>
      );
    } else {
      return (
        <button className="btn attend-new" onClick={subscribeEvent}>
          Attend Event
        </button>
      );
    }
  };

  const addComment = comment => {
    let newComments = [comment, ...comments];
    setComments(newComments);
  };

  return (
    <section className="page container EventPage">
      <div className="page-section">
        <button className="event-view-btn btn">
          <Link to="/">Go Back</Link>
        </button>
        {(event !== null && <EventItem event={event} />) || (
          <div>No Event Found</div>
        )}
        {event !== null && isAttending !== null && generateSubButton()}
        {event !== null && <EventComments comments={comments} />}
        {event !== null && (
          <CommentForm addComment={addComment} id={event.id} />
        )}
      </div>
    </section>
  );
}

function EventComments({ comments = [] }) {
  return (
    <ul className="EventPage__comment-list">
      {comments.map(comment => (
        <li key={comment.id} className="EventPage__comment">
          <p className="EventPage__comment-text">
            <FontAwesomeIcon
              size="lg"
              icon="quote-left"
              className="EventPage__comment-icon blue"
            />
            {comment.text}
          </p>
          <p className="EventPage__comment-user">{comment.user.username}</p>
        </li>
      ))}
    </ul>
  );
}
