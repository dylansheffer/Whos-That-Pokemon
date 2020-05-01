import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import Game from './components/Game';
import Header from './components/Header';

import { GET_USER_POKEDEX } from './actions/queries';
import styled from 'styled-components';

const AppStyles = styled.div`
display: grid;
height: 100vh;
width: 100vw;
grid-template-columns: 1fr;
grid-template-rows: 36px auto;
overflow: hidden;
.header {
  grid-row: 1 / 1;
}
.game {
  grid-row: 2 / -1;
}
`;

const App = () => {
  // ? Temporarily setting myself as the default user for testing purposes
  const userId = 1;
  // ? Hardcoding the Pokedex generation to 1, because I haven't added the other generations data in
  const generation = 1;

  const { loading, error, data } = useQuery(GET_USER_POKEDEX, { variables: { userId: userId, pokedexGeneration: generation } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error <span role="img" aria-label="scream">😱</span></p>;

  const { user: { pokedexes: { nodes: pokedexes } } } = data;
  const userPokedex = pokedexes[0];

  return (
    <AppStyles className="App">
      <Header className="header" />
      <Game className="game" pokedex={userPokedex} />
    </AppStyles>
  );
}

export default App;
