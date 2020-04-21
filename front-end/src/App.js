import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import './App.css';
import { ContextProvider } from './state';
import Pokedex from './components/Pokedex';
import {getPokemonImage} from './lib/helpers'

const POKEDEX_ENTRIES = gql`
  {
    pokedexEntry(pokedexId: 1, pokemonId: 104) {
      caught
      seen
      pokemon {
        name
        pokemonId
        image
      }
    }
  }
`

function App() {
  // ? Temporarily setting myself as the default user for testing purposes
  const user = {
    userId: 1,
    username: `dylansheffer`,
    firstName: `Dylan`,
    lastName: `Sheffer`,
    pokedexes: {
      nodes: [
        {
          pokedexId: 1,
        }
      ]
    }
  }

  const { pokedexId } = user.pokedexes.nodes[0];
  const { loading, error, data } = useQuery(POKEDEX_ENTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error <span role="img" aria-label="scream">😱</span></p>;

  const { pokedexEntry: { pokemon } } = data;


  return (
    <div className="App">
      <Pokedex pokedexId={pokedexId} />
      <header className="App-header">
        <img src={getPokemonImage(pokemon.pokemonId)} className="App-logo" alt={pokemon.name} />
        <h1>
          {pokemon.name}
        </h1>
      </header>
    </div>
  );
}

export default App;
