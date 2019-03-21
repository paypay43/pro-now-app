import React from 'react';

const EventContext = React.createContext({
  events: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setEventList: () => {}
});
export default EventContext;
