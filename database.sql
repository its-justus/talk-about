
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE account (
		id 								SERIAL PRIMARY KEY,
		username 					VARCHAR (80) UNIQUE NOT NULL,
		password_hashed 	VARCHAR (1000) NOT NULL,
		created_at				TIMESTAMP NOT NULL DEFAULT NOW()
);