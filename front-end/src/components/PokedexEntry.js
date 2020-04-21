import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import { Pokemon } from '../models/pokemon';
import pokeball from '../static/pokeball.png';
import unknown from '../static/unknown.png';

/**
 * Returns the correct CSS Filter property for the state of the Pokedex Entry
 *
 * @param {boolean} caught
 * @param {boolean} seen
 * @returns {string} CSS Filter Function
 */
const StatusFilterStyle = (caught, seen) => {
  if(caught) {
    return 'saturate(1)';
  }
  else if (seen) {
    return 'saturate(0)';
  }
  return 'brightness(0)';
};

/**
 * Returns the correct CSS Filter property for the state of the Pokedex Entry
 *
 * @param {boolean} caught
 * @param {boolean} seen
 * @returns {string} CSS Filter Function
 */
const ImageFilterStyle = (seen) => {
  if(seen) {
    return 'brightness(0)';
  }
  return 'saturate(1)';
};

const Entry = styled.div`
  display: flex;
  align-items: center;
`;

const EntryStatus = styled.img`
  width: 24px;
  height: 24px;
  filter: ${props => StatusFilterStyle(props.caught, props.seen)};
`;

const EntryImage = styled.img`
filter: ${props => ImageFilterStyle(props.seen)};
`;

const EntryId = styled.p``;

const EntryName = styled.p`
  text-transform: capitalize;
  display: flex;
  .unknown {
    height: 24px;
    width: 350px;
    border-radius: 10px;
    background-color: black;
  }
`;

const PokedexEntry = props => {
  const {entry: {seen, caught, pokemon: {name, pokemonId, image}}} = props;
  return (
    <Entry>
      <EntryStatus
        src={pokeball}
        seen={seen}
        caught={caught}
      />
      <EntryImage
        src={seen? require(`../static/pokemon/${pokemonId}.png`): unknown}
        seen={seen}
        caught={caught}
      />
      <EntryId>{pokemonId}</EntryId>
      <EntryName>
        {(!caught) ?
            name :
            <span className="unknown"></span>
        }
      </EntryName>
    </Entry>
  );
};

PokedexEntry.propTypes = {
  // pokemon : PropTypes.shape(Pokemon),
};

export default PokedexEntry;