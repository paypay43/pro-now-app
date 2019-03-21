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
      console.log(event);
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

module.exports = eventsRouter;
