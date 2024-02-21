CREATE DATABASE movieapp;

\c movieapp

CREATE TABLE users ( id SERIAL, user_name VARCHAR(50) NOT NULL, email VARCHAR(50) NOT NULL, password VARCHAR(60) NOT NULL);
SELECT * FROM users;

CREATE TABLE movies_by_user ( id SERIAL, id_user_liked INT, movie_id INT, name VARCHAR(60) NOT NULL, overview VARCHAR NOT NULL, poster_path VARCHAR(250), release_date VARCHAR(50));
SELECT * FROM movies_by_user;

CREATE TABLE series_by_user ( id SERIAL, id_user_liked INT, serie_id INT, name VARCHAR(60) NOT NULL, overview VARCHAR NOT NULL, poster_path VARCHAR(250), first_air_date VARCHAR(50));
SELECT * FROM series_by_user;