const xss = require('xss');

const EventsService = {
  insertEvent(db, event) {
    return db
      .insert(event)
      .into('events')
      .returning('*')
      .then(([event]) => event)
      .then(event => EventsService.getById(db, event.id));
  },

  getAllEvents(db) {
    return db
      .from('events AS event')
      .select(
        'event.id',
        'event.event_name',
        'event.date_created',
        'event.description',
        'event.date',
        'event.location',
        'usr.id as user_id',
        'usr.username',
        'usr.date_created as user_date_created'
      )
      .leftJoin('users AS usr', 'event.owner_id', 'usr.id')
      .orderBy('event.date_created', 'asc');
  },

  getById(db, id) {
    return db
      .from('events AS event')
      .select(
        'event.id',
        'event.event_name',
        'event.date_created',
        'event.description',
        'event.date',
        'event.location',
        'usr.id as user_id',
        'usr.username',
        'usr.date_created as user_date_created'
      )
      .leftJoin('users AS usr', 'event.owner_id', 'usr.id')
      .where('event.id', id)
      .first();
  },

  serializeEvent(event) {
    const { user } = event;
    return {
      id: event.id,
      location: xss(event.location),
      event_name: xss(event.event_name),
      description: xss(event.description),
      date: event.date,
      date_created: new Date(event.date_created),
      user: {
        id: event.user_id,
        username: event.username,
        date_created: new Date(event.user_date_created)
      }
    };
  }
};

module.exports = EventsService;
