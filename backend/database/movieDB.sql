CREATE DATABASE movieapp;

\c movieapp

CREATE TABLE users ( id SERIAL, user_name VARCHAR(50) NOT NULL, email VARCHAR(50) NOT NULL, password VARCHAR(60) NOT NULL);
SELECT * FROM users;

CREATE TABLE movies_and_series_by_user ( id SERIAL, id_user_liked INT, content_id INT, content_type VARCHAR, name VARCHAR(60) NOT NULL, overview VARCHAR NOT NULL, poster_path VARCHAR(250), release_date VARCHAR(50));
SELECT * FROM movies_and_series_by_user;