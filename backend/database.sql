CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE reapnsow;

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    user_password TEXT NOT NULL
);

INSERT INTO users (user_name, user_email, user_password) VALUES ('Deepak', 'deepaklaksmanj@gmail.com', 'Deepak@123');

CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY NOT NULL, 
    author_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    data jsonb NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE,
    modified_at DATE
);

CREATE TABLE answers (
    answer_id SERIAL PRIMARY KEY NOT NULL,
    author_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    question_id INT REFERENCES questions(question_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE,
    modified_at DATE
);

CREATE TABLE todelete (
    deletion_id SERIAL PRIMARY KEY NOT NULL,
    question_id INT REFERENCES questions(question_id) ON DELETE CASCADE,
    expiry_time DATE
);

-- \c <db_name>               -> for connecting to db