import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import pokeballImage from '../static/pokeball.png';

const Pokeball = styled.img`
  width: 24px;
  height: 24px;
  filter: brightness(0);
  &.seen {
    filter: saturate(0);
  }
  &.caught {
    filter: saturate(1);
  }
`;

const EntryStatus = (props) => {
  const { seen, caught } = props;
  return (
    <Pokeball
      className={(seen ? 'seen ' : '') + (caught ? 'caught ' : '')}
      src={pokeballImage} />
  );

};

EntryStatus.propTypes = {
  seen: PropTypes.bool,
  caught: PropTypes.bool,
}


export default EntryStatus;