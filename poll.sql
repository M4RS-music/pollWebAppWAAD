DROP TABLE IF EXISTS questions;
CREATE TABLE questions(
  id SERIAL PRIMARY KEY,
  question VARCHAR NOT NULL
);

DROP TABLE IF EXISTS answers;
CREATE TABLE answers(
  id SERIAL PRIMARY KEY,
  question_id INT NOT NULL,
  answer VARCHAR NOT NULL,
  vote INT DEFAULT 0 NOT NULL
);

INSERT INTO questions (question) VALUES
('Is New York a city or state?'),
('Would you try to be friends with an alien?');

INSERT INTO answers (question_id, answer, vote) VALUES
(1, 'City', 23),
(1, 'State', 41),
(1, 'I dont know', 1),
(2, 'Yes', 57),
(2, 'No', 143),
(2, 'Not Sure', 20);
