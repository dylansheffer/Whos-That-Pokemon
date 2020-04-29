import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import pokeball from '../static/pokeball.png';

/**
 * Returns the correct CSS Filter property for the state of the Pokedex Entry
 *
 * @param {boolean} caught
 * @param {boolean} seen
 * @returns {string} CSS Filter Function
 */
const StatusFilterStyle = (caught, seen) => {
  if (caught) {
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
const ImageFilterStyle = (caught, seen) => {
  if (!caught && seen) {
    return 'brightness(0)';
  }
  return 'saturate(1)';
};

const Entry = styled.button`
  border: 0;
  width: 100%;
  text-align: left;
  background: none;
  cursor: pointer;
`;


const EntryImage = styled.img`
filter: ${props => ImageFilterStyle(props.caught, props.seen)};
`;
const PokemonNameContainer = styled.div`
  margin: 4px 0 4px 16px;
  display: grid;
  grid-template-columns: 1fr 5fr;
  align-items: center;
`;

const EntryId = styled.div`
  font-family: var(--pixel-font);
  font-size: 24px;
`;

const EntryStatus = styled.img`
  width: 24px;
  height: 24px;
  filter: ${props => StatusFilterStyle(props.caught, props.seen)};
`;

const EntryName = styled.p`
  font-size: 24px;
  font-family: var(--pixel-font);
  text-transform: capitalize;
  display: flex;
  margin: 0;
  .unknown {
    height: 24px;
    width: 100%;
    min-width: 75px;
    border-radius: 10px;
    background-color: black;
  }
`;

const PokemonId = ({ pokemonId }) => {
  const displayId = (pokemonId) => `${pokemonId}`.padStart(3, '0');
  return <EntryId>{displayId(pokemonId)}</EntryId>
}


const PokedexEntry = props => {
  const { entry: { seen, caught, pokemon: { name, pokemonId } } } = props;
  return (
    <Entry>
      <PokemonId pokemonId={pokemonId} />
      <PokemonNameContainer>
        <EntryStatus
          src={pokeball}
          seen={seen}
          caught={caught}
        />
        <EntryName>
          {(caught) ?
            name :
            <span className="unknown"></span>
          }
        </EntryName>
      </PokemonNameContainer>
    </Entry>
  );
};

PokedexEntry.propTypes = {
  // pokemon : PropTypes.shape(Pokemon),
};

export default PokedexEntry;