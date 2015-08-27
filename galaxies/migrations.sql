CREATE DATABASE instafake;

\c instafake;

CREATE TABLE Instagram (id SERIAL PRIMARY KEY, username VARCHAR(255), post VARCHAR(255), description VARCHAR(255), hashtags VARCHAR(255));
