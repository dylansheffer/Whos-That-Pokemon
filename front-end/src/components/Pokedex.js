import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import { Pokedex as PokedexModel } from '../models/pokedex'
import PokedexEntry from '../components/PokedexEntry'

const PokedexList = styled.ul`
  list-style: none;
  padding: 0;
`;

class Pokedex extends Component {
  render() {
    const { pokedex : { pokemon } } = this.props;
    return (
      <PokedexList>
        {pokemon
          .sort((a, b) => a.id - b.id)
          .map(p =>
          <li key={p.id}>
            <PokedexEntry pokemon={p} />
          </li>)}
      </PokedexList>
    );
  }
}

Pokedex.propTypes = {
  // pokedex: PropTypes.shape(PokedexModel),
};

export default Pokedex;