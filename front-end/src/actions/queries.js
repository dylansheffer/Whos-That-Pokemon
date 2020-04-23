import { gql } from 'apollo-boost';

export const GET_POKEDEX_BY_ID = gql`
  query getPokedexById($pokedexId: Int!) {
    pokedex(pokedexId: $pokedexId) {
      pokedexId
      isComplete
      pokedexEntries {
        nodes {
          pokemon {
            pokemonId
            name
            image
          }
          seen
          caught
        }
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById ($userId: Int!) {
    user(userId: $userId) {
      userId
      username
      firstName
      lastName
    }
  }
`;

export const GET_USER_POKEDEX = gql`
  query getUserPokedex($userId: Int!, $pokedexGeneration: Int) {
    user(userId: $userId) {
      userId
      username
      firstName
      lastName
      pokedexes(filter: {
        generation: {equalTo: $pokedexGeneration}
      }) {
        nodes {
          pokedexId
          generation
          isComplete
          pokedexEntries {
            nodes{
              pokemon {
                pokemonId
                name
              }
              seen
              caught
            }
          }
        }
      }
    }
  }
`;