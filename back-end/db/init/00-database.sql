\connect pokemon;

/* Create user table */
DROP TABLE IF EXISTS "users";

CREATE TABLE IF NOT EXISTS "users" (
"user_id" SERIAL PRIMARY KEY,
"username" TEXT NULL,
"first_name" TEXT NULL,
"last_name" TEXT NULL
);

/* Create pokemon table */
DROP TABLE IF EXISTS "pokemon";

CREATE TABLE IF NOT EXISTS "pokemon" (
"pokemon_id" INT PRIMARY KEY,
"name" TEXT NOT NULL,
"image" TEXT NOT NULL
);

/* Create pokedex table */
DROP TABLE IF EXISTS "pokedex";

CREATE TABLE IF NOT EXISTS "pokedex" (
"pokedex_id" SERIAL PRIMARY KEY,
"user_id" INT NOT NULL,
"is_complete" BOOL DEFAULT false,
"generation" INT NOT NULL,
FOREIGN KEY ("user_id") REFERENCES users ("user_id")
);

/* Create pokedex-entries table */
DROP TABLE IF EXISTS "pokedex_entries";

CREATE TABLE IF NOT EXISTS "pokedex_entries" (
"pokedex_id" INT NOT NULL,
"pokemon_id" INT NOT NULL,
"seen" BOOL DEFAULT false,
"caught" BOOL DEFAULT false,
PRIMARY KEY ("pokedex_id", "pokemon_id"),
FOREIGN KEY ("pokedex_id") REFERENCES pokedex ("pokedex_id") ON DELETE CASCADE,
FOREIGN KEY ("pokemon_id") REFERENCES pokemon ("pokemon_id") ON DELETE CASCADE
);