import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import Game from './components/Game';
import Header from './components/Header';

import { GET_USER_POKEDEX } from './actions/queries';
import styled from 'styled-components';



function App() {
  // ? Temporarily setting myself as the default user for testing purposes
  const userId = 1;
  // ? Hardcoding the Pokedex generation to 1, because I haven't added the other generations data in
  const generation = 1;

  const { loading, error, data } = useQuery(GET_USER_POKEDEX, { variables: { userId: userId, pokedexGeneration: generation } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error <span role="img" aria-label="scream">😱</span></p>;

  const { user: { pokedexes: { nodes: pokedexes } } } = data;
  const userPokedex = pokedexes[0];

  const App = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `;

  return (
    <App className="App">
      <Header />
      <Game pokedex={userPokedex} />
    </App>
  );
}

export default App;
