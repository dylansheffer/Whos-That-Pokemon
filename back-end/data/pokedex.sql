DROP TABLE IF EXISTS "pokedex";

CREATE TABLE IF NOT EXISTS "pokedex" (
"pokedex_id" SERIAL PRIMARY KEY,
"user_id" INT NOT NULL
CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES users ("user_id")
);