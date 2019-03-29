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

  getEventComments(db, id) {
    return db
      .from('event_comments AS comm')
      .select(
        'comm.id',
        'comm.text',
        'comm.event_id',
        'comm.date_created',
        'usr.id as user_id',
        'usr.username'
      )
      .leftJoin('users AS usr', 'comm.user_id', 'usr.id')
      .where('comm.event_id', id)
      .orderBy('comm.date_created', 'desc');

    /*return db
      .from('event_subscriptions AS sub')
      .select(
        'sub.id',
        'sub.event_id',
        'sub.status',
        'usr.id as user_id',
        'usr.username'
      )
      .leftJoin('users AS usr', 'sub.user_id', 'usr.id')
      .where('sub.event_id', id);*/
  },

  subscribeEvent(db, sub) {
    return db
      .insert(sub)
      .into('event_subscriptions')
      .returning('*')
      .then(([sub]) => sub);
  },

  insertEventComment(db, newComment) {
    return db
      .insert(newComment)
      .into('event_comments')
      .returning('*')
      .then(([comment]) => comment)
      .then(comment => EventsService.getCommentById(db, comment.id));
  },

  getCommentById(db, id) {
    return db
      .from('event_comments AS comm')
      .select(
        'comm.id',
        'comm.text',
        'comm.date_created',
        'comm.event_id',
        'usr.id as user_id',
        'usr.username'
      )
      .leftJoin('users AS usr', 'comm.user_id', 'usr.id')
      .where('comm.id', id)
      .first();
  },

  getEventSubscriptions(db, id) {
    return db
      .from('event_subscriptions AS sub')
      .select(
        'sub.id',
        'sub.event_id',
        'sub.status',
        'usr.id as user_id',
        'usr.username'
      )
      .leftJoin('users AS usr', 'sub.user_id', 'usr.id')
      .where('sub.event_id', id);
  },

  updateSubscription(db, sub) {
    return db
      .from('event_subscriptions AS sub')
      .where('sub.event_id', sub.event_id)
      .andWhere('sub.user_id', sub.user_id)
      .debug()
      .update({
        status: sub.status
      });
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
      .orderBy('event.date_created', 'desc');
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
        'usr.date_created as user_date_created',
        'sub.status'
      )
      .leftJoin('users AS usr', 'event.owner_id', 'usr.id')
      .leftJoin('event_subscriptions as sub', 'event.id', 'sub.event_id')
      .where('event.id', id)
      .first();
  },

  getSubscriptionById(db, id, user_id) {
    return db
      .from('event_subscriptions AS sub')
      .select(
        'sub.id',
        'sub.event_id',
        'sub.date_created',
        'sub.status',
        'sub.user_id'
      )
      .where('sub.event_id', id)
      .andWhere('sub.user_id', user_id)
      .first();
  },

  serializeEvent(event) {
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
  },
  serializeEventComment(comment) {
    return {
      id: comment.id,
      event: comment.event_id,
      text: xss(comment.text),
      date_created: new Date(comment.date_created),
      user: {
        id: comment.user_id,
        username: comment.username
      }
    };
  }
};

module.exports = EventsService;
