import { gql } from 'apollo-boost';


export const SEE_POKEMON = gql`
  mutation seePokemon($pokedexId: Int!, $pokemonId: Int!) {
    updatePokedexEntry(input: {pokedexId: $pokedexId, pokemonId: $pokemonId, patch: {seen: true}}) {
      pokedex {
        pokedexId
        isComplete
        pokedexEntries {
          nodes {
            seen
            caught
            pokemon {
              pokemonId
              name
            }
          }
        }
      }
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
      pokedex {
        pokedexId
        isComplete
        pokedexEntries {
          nodes {
            seen
            caught
            pokemon {
              pokemonId
              name
            }
          }
        }
      }
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
export const RESET_ENTRY = gql`
  mutation resetEntry($pokedexId: Int!, $pokemonId: Int!) {
    updatePokedexEntry(input: {pokedexId: $pokedexId, pokemonId: $pokemonId, patch: {caught: false, seen: false}}) {
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

export const COMPLETE_POKEDEX = gql`
  mutation completePokedex($pokedexId: Int!, $isComplete: Boolean = true) {
  updatePokedex(input: {pokedexId: $pokedexId, patch: {isComplete: $isComplete}}) {
    pokedex {
      pokedexId
      pokedexEntries {
        nodes {
          pokemon {
            pokemonId
            name
          }
        }
      }
    }
  }
}
`;