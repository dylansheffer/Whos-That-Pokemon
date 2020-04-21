import { gql } from 'apollo-boost';

export const GET_POKEDEX_BY_ID = gql`
  query getPokedexById($pokedexId: Int!) {
    pokedex(pokedexId: $pokedexId) {
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