import React, { Fragment } from 'react';

import { getPokemonImage } from '../lib/helpers';


const Quiz = (props) => {
  const { questions, answer, onAnswerSelected } = props;

  return (
    <div>
      <img src={getPokemonImage(answer.pokemon.pokemonId)} alt={answer.pokemon.name} />
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