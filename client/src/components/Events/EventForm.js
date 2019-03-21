import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthApiService from '../../services/auth-api-service';
import EventApiService from '../../services/event-api-service';
import './event.css';

export default function EventForm(props) {
  const [error, setError] = useState(null);

  /*const handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    ;
  };*/

  const submitForm = e => {
    e.preventDefault();
    setError(null);
    const { event_name, location, description, date } = e.target;

    EventApiService.postEvent({
      event_name: event_name.value,
      location: location.value,
      description: description.value,
      date: date.value
    })
      .then(event => {
        event_name.value = '';
        location.value = '';
        description.value = '';
        date.value = '';
        props.create(event.id);
      })
      .catch(res => {
        setError({ error: res.error });
      });
  };

  const displayError = () => {
    return Object.keys(error).map(e => {
      return (
        <span key={e}>
          {e}: {error[e]}
        </span>
      );
    });
  };

  return (
    <form onSubmit={submitForm} className="event-form app-form">
      <h1>Create Event</h1>
      <div role="alert">{error && <p className="red">{displayError()}</p>}</div>
      <label className="label-control" htmlFor="event_name">
        Event Name
      </label>
      <input
        name="event_name"
        type="text"
        className="form-control"
        required
        autoFocus=""
      />
      <label className="label-control" htmlFor="location">
        Location
      </label>
      <input
        name="location"
        type="location"
        id="inputlocation"
        className="form-control"
        required
      />
      <label className="label-control" htmlFor="decsription">
        Description
      </label>
      <textarea
        name="description"
        type="text"
        className="form-control"
        required
      />
      <label className="label-control" htmlFor="date">
        Date/Time
      </label>
      <input name="date" type="text" className="form-control" required />
      <button className="btn add" type="submit">
        Add
      </button>
    </form>
  );
}
