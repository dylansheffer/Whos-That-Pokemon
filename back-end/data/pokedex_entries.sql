DROP TABLE IF EXISTS "pokedex_entries";

CREATE TABLE IF NOT EXISTS "pokedex_entries" (
"pokedex_id" INT NOT NULL,
"pokemon_id" INT NOT NULL,
"seen" BOOL DEFAULT false,
"caught" BOOL DEFAULT false,
PRIMARY KEY("pokedex_id", "pokemon_id"),
FOREIGN KEY ("pokedex_id") REFERENCES pokedex("pokedex_id") ON DELETE CASCADE,
FOREIGN KEY ("pokemon_id") REFERENCES pokemon("pokemon_id") ON DELETE CASCADE,
);
