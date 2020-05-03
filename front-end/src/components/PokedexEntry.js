import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import pokeball from '../static/pokeball.png';
import { Windows98PopUp } from './Windows98Popup';
import { getPokemonImage } from '../lib/helpers';
import UnknownPokemonImage from '../static/unknown.png'

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


const EntryImageStyle = styled.img`
  filter: ${({ caught, seen }) => ImageFilterStyle(caught, seen)};
`;

const EntryImage = ({caught, seen, pokemonId, ...rest }) => {
  const imageSrc = (caught || seen) ? getPokemonImage(pokemonId) : UnknownPokemonImage;
  return <EntryImageStyle caught={caught} seen={seen} src={imageSrc} {...rest} />;
}
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
  filter: ${({ caught, seen }) => StatusFilterStyle(caught, seen)};
`;

const EntryNameStyle = styled.p`
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

const EntryName = ({ caught, pokemonName, ...rest}) => {
  return (
    <EntryNameStyle {...rest}>
      {(caught) ?
        pokemonName :
        <span className="unknown"></span>
      }
    </EntryNameStyle>
  );
}

const PokemonId = ({ pokemonId }) => {
  const displayId = (pokemonId) => `${pokemonId}`.padStart(3, '0');
  return <EntryId>{displayId(pokemonId)}</EntryId>
}

const PokedexPopupStyle = styled.div`
  padding: 8px;
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const PokedexEntryPopup = ({ entry }) => {
  const { seen, caught, pokemon } = entry;
  return (
    <PokedexPopupStyle>
      <EntryImage caught={caught} seen={seen} pokemonId={pokemon.pokemonId} className='popup-image' />
      <Entry as='div' className='popup-entry'>
        <PokemonId pokemonId={pokemon.pokemonId} />
        <PokemonNameContainer>
          <EntryStatus
            src={pokeball}
            seen={seen}
            caught={caught}
          />
          <EntryName caught={caught} pokemonName={pokemon.name} />
        </PokemonNameContainer>
      </Entry>
    </PokedexPopupStyle>
  )
}

class PokedexEntry extends React.Component {
  openPopup = () => {
    this.dialog.show();
  }

  closePopup = () => {
    this.dialog.hide();
  }

  render() {
    const { entry: { seen, caught, pokemon }, entry } = this.props;
    return (
      <>
        <Entry onClick={this.openPopup}>
          <PokemonId pokemonId={pokemon.pokemonId} />
          <PokemonNameContainer>
            <EntryStatus
              src={pokeball}
              seen={seen}
              caught={caught}
            />
            <EntryName caught={caught} pokemonName={pokemon.name} />
          </PokemonNameContainer>
        </Entry>
        <Windows98PopUp
          id={`pokedex-entry-${pokemon.pokemonId}`}
          appRoot="#main"
          dialogRoot="#dialog-root"
          dialogRef={(dialog) => (this.dialog = dialog)}
          title="Pokedex Entry"
          onClose={this.closePopup}
        >
          <PokedexEntryPopup entry={entry} />
        </Windows98PopUp>
      </>
    );
  }
};

PokedexEntry.propTypes = {
  // pokemon : PropTypes.shape(Pokemon),
};

export default PokedexEntry;