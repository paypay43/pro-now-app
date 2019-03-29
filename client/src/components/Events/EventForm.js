import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthApiService from '../../services/auth-api-service';
import EventApiService from '../../services/event-api-service';
import EventLocationInput from './EventLocationInput';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './event.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

export default function EventForm(props) {
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);
  const [place, setPlace] = useState('');

  /*const handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    ;
  };*/

  const submitForm = e => {
    e.preventDefault();
    setError(null);
    const { event_name, description } = e.target;

    EventApiService.postEvent({
      event_name: event_name.value,
      location: place,
      description: description.value,
      date: date
    })
      .then(event => {
        event_name.value = '';
        description.value = '';
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

  const changeView = () => {
    props.changeView();
  };

  const changeLocation = value => {
    setPlace(value);
  };

  return (
    <form onSubmit={submitForm} className="event-form app-form">
      <h2>Create Event</h2>
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
      <EventLocationInput setAddress={changeLocation} />
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
      <DatePicker selected={date} onChange={value => setDate(value)} />
      <button className="btn add" type="submit">
        Add
      </button>
    </form>
  );
}
