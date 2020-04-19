import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import './App.css';

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
  const { loading, error, data } = useQuery(POKEDEX_ENTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error <span role="img" aria-label="scream">😱</span></p>;

  const { pokedexEntry: { pokemon } } = data;
  return (
    <div className="App">
      <header className="App-header">
        <img src={pokemon.image} className="App-logo" alt="logo" />
        <h1>
          {pokemon.name}
        </h1>
      </header>
    </div>
  );
}

export default App;
