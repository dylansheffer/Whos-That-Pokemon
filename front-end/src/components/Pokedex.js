import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PokedexEntry from '../components/PokedexEntry';

const PokedexStyles = styled.div`
  background-color: var(--pokemon-ui-surface);
  border: 1px solid var(--button-shadow);
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 16px 16px 16px;
`;

const PokedexList = styled.ul`
  list-style: none;
  margin: 4px 0 0 0;
  padding: 0;
`;

const PokedexTitle = styled.h2`
  font-family: var(--pixel-font);
  font-size: 32px;
  position: sticky;
  top: 0;
  margin: 0;
  background: var(--pokemon-ui-surface);
  z-index: 1;
  padding: 4px 0;
  width: 100%;
`;

const PokedexEntries = styled.div``;

const Pokedex = props => {
  const { pokedex } = props;
  return (
    <PokedexStyles>
      <PokedexEntries>
        <PokedexTitle>Pokedex</PokedexTitle>
        <PokedexList>
          {pokedex.pokedexEntries.nodes.map(e =>
            <li key={e.pokemon.pokemonId}>
              <PokedexEntry entry={e} />
            </li>
          )}
        </PokedexList>
      </PokedexEntries>
    </PokedexStyles>
  )
}

Pokedex.propTypes = {
  // pokedex: PropTypes.shape(PokedexModel),
};

export default Pokedex;