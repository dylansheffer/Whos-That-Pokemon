import React, { Fragment } from 'react';

import { getPokemonImage } from '../lib/helpers';
import styled from 'styled-components';

const MysteryPokemon = styled.img`
  filter: brightness(0);
  &&.correct {
    filter: brightness(1);
  }
`;


const Quiz = (props) => {
  const { questions, answer, onAnswerSelected, answerIsCorrect } = props;

  return (
    <div>
      <h1>Who's That Pokemon?!?</h1>
      <MysteryPokemon className={answerIsCorrect ? 'correct' : ''} src={getPokemonImage(answer.pokemon.pokemonId)} alt={answer.pokemon.name} />
      <form>
        {questions ? questions.map(q => {
          const { pokemon: {pokemonId, name}} = q;
          return (
            <Fragment key={pokemonId}>
              <input type="radio" id={pokemonId} name="quiz" value={pokemonId} onChange={onAnswerSelected} />
              <label htmlFor={pokemonId}>{name}</label>
            </Fragment>
          );
        }) : <p>Loading...</p>}
      </form>
    </div>
  );
};

export default Quiz;