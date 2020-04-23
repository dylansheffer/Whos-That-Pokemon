![Who's That Pokemon](https://i.imgur.com/lwp3k21.png)

# Who's That Pokemon?!?

Who's That Pokemon?!? is a full-stack quiz game based off the famous [segment of the Pokemon Anime](https://www.youtube.com/watch?v=gOLXYAlC-R8). The project's back-end utilizes Docker, PostgeSQL, and GraphQL (PostGraphile). The project's front-end uses React, Apollo Client, and Styled Components.

## Set-up

### Prerequisites

- [Node](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/get-started)

### Install Steps

1. Clone Repo
2. Navigate into the `back-end` folder in your terminal
3. Start the Docker container by running `docker-compose up -d`
   - This will create containers for PostgreSQL, PostGraphile, and Adminer. It will also seed the database with the data it needs to run.
4. Navigate to the `front-end` folder in your terminal
5. Run `npm install` to download the javascript dependencies
6. Run `npm start` to start the React App
7. Navigate to `localhost:3000` to play the game!

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

- Refactor the Docker Compose, so that it will also start the React.

### Back-end

- User registration
- Create an intermediary GraphQL API that sits between Apollo Client on the front-end and my PostGraphile API on the back-end
  - This would allow me to perform custom server-side logic and query/mutation resolvers, perform authentication, check permissions, and to disable CORS on my PostGraphile API
  - This is important because the basic user SHOULD NOT have full CRUD access to the database nor be able to make complicated queries that could lock-up the database.
- Add a Description field to the Pokemon object, which contains a description of the Pokemon
  - Allows me to make the quiz more accessible, if I can set the `alt` text to the Pokemon's description

### Front-end

- Use a service worker to save the pokemon image to the user's computer after they download it the first time
- Add prop-types to components
- Improve overall accessibility
  - Fix bug with keyboard navigation on the questions
  - Make the toast notification an `aria-live` region.
  - Set the Mystery Pokemon's `alt` text to a description of the Pokemon.
- Use a custom component as the toast notification, so it matches the Pokemon ascetic.
- Make the entire question a touch target instead of just the text.
- Add a route that shows the user their current Pokedex progress
- Add gaudy 90's Pokemon sound effects
