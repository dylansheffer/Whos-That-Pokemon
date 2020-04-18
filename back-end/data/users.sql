DROP TABLE IF EXISTS "users";

CREATE TABLE IF NOT EXISTS "users" (
"user_id" SERIAL PRIMARY KEY,
"username" TEXT NULL,
"first_name" TEXT NULL,
"last_name" TEXT NULL
);

INSERT INTO users VALUES
('dylansheffer','dylan','sheffer');