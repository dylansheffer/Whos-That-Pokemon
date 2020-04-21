import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import './App.css';
import Pokedex from './components/Pokedex';
import { GET_USER_POKEDEX } from './actions/queries';



function App() {
  // ? Temporarily setting myself as the default user for testing purposes
  const userId = 1;
  // ? Hardcoding the Pokedex generation to 1, because I haven't added the other generations data in
  const generation = 1;

  const { loading, error, data } = useQuery(GET_USER_POKEDEX, {variables: {userId: userId, pokedexGeneration: generation}});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error <span role="img" aria-label="scream">😱</span></p>;

  const { user: {pokedexes: {nodes: pokedexes }}} = data;
  const userPokedex = pokedexes[0];

  return (
    <div className="App">
      <Pokedex pokedex={userPokedex} />
    </div>
  );
}

export default App;
