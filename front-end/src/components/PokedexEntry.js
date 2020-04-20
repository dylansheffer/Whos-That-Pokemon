import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import { Pokemon } from '../models/pokemon';
import pokeball from '../static/pokeball.png';

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
  else if(seen) {
    return 'saturate(0)';
  }

  return 'brightness(0)';
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
filter: ${props => StatusFilterStyle(props.caught, props.seen)};
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
  const {
    pokemon:
    {
      id,
      name,
      seen,
      caught,
      image,
    }
} = props;
  return (
    <Entry>
      <EntryStatus
        src={pokeball}
        seen={seen}
        caught={caught}
      />
      <EntryImage
        src={image}
        seen={seen}
        caught={caught}
      />
      <EntryId>{id}</EntryId>
      <EntryName>
        {(caught) ?
            name :
            <div className="unknown"></div>
        }
      </EntryName>
    </Entry>
  );
};

PokedexEntry.propTypes = {
  // pokemon : PropTypes.shape(Pokemon),
};

export default PokedexEntry;