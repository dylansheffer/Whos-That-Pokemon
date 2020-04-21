import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

// import { Pokedex as PokedexModel } from '../models/pokedex'
import PokedexEntry from '../components/PokedexEntry';
import { GET_POKEDEX_BY_ID } from '../actions/queries';

const PokedexList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Pokedex = props => {
  const { pokedexId } = props;
  const { loading, error, data } = useQuery(GET_POKEDEX_BY_ID,
    { variables:
      { pokedexId: pokedexId }
    });
  const pokedex = data?.pokedex;
  return(
    <PokedexList>
      {pokedex?.pokedexEntries.nodes.map(e =>
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