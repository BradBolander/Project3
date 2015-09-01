CREATE DATABASE galaxies;

\c galaxies;

CREATE TABLE galaxy (id SERIAL PRIMARY KEY, name VARCHAR(255), radius VARCHAR(255), color VARCHAR(255), brightness VARCHAR(255), stars VARCHAR(255));
