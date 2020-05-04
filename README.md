![Who's That Pokemon](https://i.imgur.com/lwp3k21.png)

# Who's That Pokemon?!?

Who's That Pokemon?!? is a full-stack quiz game based off the famous [segment of the Pokemon Anime](https://www.youtube.com/watch?v=gOLXYAlC-R8). The project's back-end utilizes Docker, PostgeSQL, and GraphQL (PostGraphile). The project's front-end uses React, Apollo Client, and Styled Components.

## Set-up

### Prerequisites

- [Node](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/get-started)

### Development Install Steps

1. Clone Repo
2. Create a `.env` file in the root of the directory and add the contents below
3. Start the Docker container by running `docker-compose up -d --build`
4. Navigate to `localhost` to play the game!

### Production Build Steps

1. Run `docker-compose down -v` to bring down the development containers (if they're running)
2. Start the Docker container by running `docker-compose -f docker-compose.prod.yml up --build -d`
3. The game is running at `localhost`

#### `.env` File Contents

```env
# DB
# Parameters used by db container
POSTGRES_DB=pokemon
POSTGRES_USER=postgres
POSTGRES_PASSWORD={YOUR SECRET}

# GRAPHQL
# Parameters used by graphql container
DATABASE_URL=postgres://postgres:{YOUR SECRET}@postgres:5432/pokemon
```

## Back-end

The back-end is comprised of 3 Docker containers; `postgres`, `adminer`, and `graphql`. `postgres` contains the database, `adminer` is a web-based SQL database management tool, and `graphql` contains the GraphQL API served by PostGraphile.

| Service  | Address                                            |
| :------: | -------------------------------------------------- |
| postgres | postgres://postgres:{SECRET}@postgres:5432/pokemon |
| adminer  | http://localhost:8080/                             |
| graphql  | http://localhost:5433/graphql                      |
| graphiql | http://localhost:5433/graphiql                     |

## Front-End

The front-end is a React application that uses React Hooks (local state) and Apollo Client (global state) for its state management.

The application is styled via [Styled Components](https://styled-components.com/), which is an excellent CSS in JS library. This is my styling method method of choice in React Apps because it allows me to easily create atomic and reusable components.

## Known Issues

- The Pokemon selector is currently not keyboard accessible

## Road-map

### General

### Back-end

- User registration
- Add a Description field to the Pokemon object, which contains a description of the Pokemon
  - Allows me to make the quiz more accessible, if I can set the `alt` text to the Pokemon's description
- Add every Pokemon and create different Pokedexes for each generation

### Front-end

- Use a service worker to save the pokemon image to the user's computer after they download it the first time
- Add Prettier config, so my code will be automatically formatted
- Add prop-types to components
- Improve overall accessibility
  - Fix bug with keyboard navigation on the questions
  - Make the toast notification an `aria-live` region.
  - Set the Mystery Pokemon's `alt` text to a description of the Pokemon.
- Use a custom component as the toast notification, so it matches the Pokemon ascetic.
- Make the entire question a touch target instead of just the text.
- Add a route that shows the user their current Pokedex progress
- Add generation selector, to change between Pokemon generations
- Create a proper victory screen
- Create a consistent `loading...` component
- Add gaudy 90's Pokemon sound effects
