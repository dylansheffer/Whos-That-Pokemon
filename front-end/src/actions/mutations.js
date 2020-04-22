import { gql } from 'apollo-boost';


export const SEE_POKEMON = gql`
  mutation seePokemon($pokedexId: Int!, $pokemonId: Int!) {
    updatePokedexEntry(input: {pokedexId: $pokedexId, pokemonId: $pokemonId, patch: {seen: true}}) {
      pokedexEntry {
        seen
        caught
        pokemon {
          pokemonId
          name
        }
      }
    }
  }
`;

export const CATCH_POKEMON = gql`
  mutation catchPokemon($pokedexId: Int!, $pokemonId: Int!, $catchSuccessful: Boolean) {
    updatePokedexEntry(input: {pokedexId: $pokedexId, pokemonId: $pokemonId, patch: {caught: $catchSuccessful, seen: true}}) {
      pokedexEntry {
        seen
        caught
        pokemon {
          pokemonId
          name
        }
      }
    }
  }
`;