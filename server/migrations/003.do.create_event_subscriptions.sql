DROP TABLE IF EXISTS event_subscriptions;




CREATE TABLE event_subscriptions (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_id integer REFERENCES users(id) NOT NULL,
    event_id integer REFERENCES events(id) NOT NULL,
    status text,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    date_modified TIMESTAMP
    
);


ALTER TABLE event_subscriptions ALTER COLUMN id RESTART WITH 1000000;
