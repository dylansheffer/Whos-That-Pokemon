import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import { Pokedex as PokedexModel } from '../models/pokedex'
import PokedexEntry from '../components/PokedexEntry';

const PokedexList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Pokedex = props => {
  const { pokedex } = props;
  return(
    <PokedexList>
      {pokedex.pokedexEntries.nodes.map(e =>
        <li key={e.pokemon.pokemonId}>
          <PokedexEntry entry={e} />
        </li>
      )}
    </PokedexList>
    )
  }

Pokedex.propTypes = {
  // pokedex: PropTypes.shape(PokedexModel),
};

export default Pokedex;