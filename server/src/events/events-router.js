'use strict';
const express = require('express');
const EventsService = require('./events-service');
const { requireAuth } = require('../middleware/jwt-auth');
const path = require('path');

const eventsRouter = express.Router();
const jsonBodyParser = express.json();

eventsRouter.post('/', requireAuth, jsonBodyParser, (req, res, next) => {
  const { event_name, date, description, location } = req.body;
  const newEvent = { event_name, date, description, location };
  for (const field of ['event_name', 'date', 'location'])
    if (!req.body[field]) {
      return res.status(400).json({
        error: `Missing '${field}' in request body`
      });
    }
  newEvent.owner_id = req.user.id;
  EventsService.insertEvent(req.app.get('db'), newEvent)
    .then(event => {
      return (
        res
          .status(201)
          //.location(path.posix.join(req.originalUrl, `/${event.id}`))
          .json(EventsService.serializeEvent(event))
      );
    })
    .catch(next);
});

eventsRouter.route('/').get((req, res, next) => {
  EventsService.getAllEvents(req.app.get('db'))
    .then(events => {
      res.json(events.map(EventsService.serializeEvent));
    })
    .catch(next);
});

eventsRouter
  .route('/:id')
  .all(requireAuth)
  .all(checkEventExists)
  .get((req, res) => {
    res.json(EventsService.serializeEvent(res.event));
  });
eventsRouter
  .route('/:id/comments')
  .all(requireAuth)
  .all(checkEventExists)
  .get((req, res, next) => {
    EventsService.getEventComments(req.app.get('db'), req.params.id)
      .then(comments => {
        res.json(comments.map(EventsService.serializeEventComment));
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { text } = req.body;
    const newComment = { text, event_id: res.event.id, user_id: req.user.id };
    for (const field of ['text'])
      if (!req.body[field]) {
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });
      }

    EventsService.insertEventComment(req.app.get('db'), newComment)
      .then(comment => {
        return (
          res
            .status(201)
            //.location(path.posix.join(req.originalUrl, `/${event.id}`))
            .json(EventsService.serializeEventComment(comment))
        );
      })
      .catch(next);
  });

eventsRouter
  .route('/:id/subscribe')
  .all(requireAuth)
  .all(checkEventExists)
  .get((req, res, next) => {
    EventsService.getEventSubscriptions(req.app.get('db'), res.event.id)
      .then(subs => res.json(subs))
      .catch(next);
  })
  .post(async (req, res, next) => {
    const newSub = {};

    newSub.user_id = req.user.id;
    newSub.event_id = res.event.id;

    const status = await checkEventSubscriptionExists(req, res, next);

    if (status === null) {
      newSub.status = 'ATTENDING';
      EventsService.subscribeEvent(req.app.get('db'), newSub).then(sub => {
        res.status(200).json({
          status: newSub.status
        });
      });
    } else {
      newSub.status = status === 'ATTENDING' ? 'UNATTENDING' : 'ATTENDING';

      EventsService.updateSubscription(req.app.get('db'), newSub).then(() => {
        res.status(200).json({
          status: newSub.status
        });
      });
    }
  });

async function checkEventExists(req, res, next) {
  try {
    const event = await EventsService.getById(req.app.get('db'), req.params.id);

    if (!event)
      return res.status(404).json({
        error: `Event doesn't exist`
      });

    res.event = event;
    next();
  } catch (error) {
    next(error);
  }
}

async function checkEventSubscriptionExists(req, res, next) {
  try {
    const sub = await EventsService.getSubscriptionById(
      req.app.get('db'),
      req.params.id,
      req.user.id
    );

    return sub ? sub.status : null;
  } catch (error) {
    next(error);
  }
}

module.exports = eventsRouter;
