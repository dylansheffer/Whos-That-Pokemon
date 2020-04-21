import React, { Fragment } from 'react';

import { Question } from '../objects/Question';
import { getRandomInt, getPokemonImage } from '../lib/helpers';

const selectUniquePokemon = (pokemonList, masterList) => {
  const pokemon = masterList[getRandomInt(0, masterList.length-1)];
  // * If the selected pokemon is in the pokemonList, select a new one
  if (pokemonList.includes(pokemon)) {
    selectUniquePokemon(pokemonList, masterList);
  }
  else {
    return pokemon;
  }
}

const generateQuestions = (numberOfQuestions, availablePokemon) => {
  let pokemonList = [];
  // * Generate the requested number of questions unless there are less available pokemon than requested
  if(numberOfQuestions < availablePokemon.length) {
    for (let i=0; i < numberOfQuestions; i++) {
      pokemonList.push(selectUniquePokemon(pokemonList, availablePokemon));
    }
  }
  else {
    for (let i=0; i < availablePokemon.length; i++) {
      pokemonList.push(selectUniquePokemon(pokemonList, availablePokemon));
    }
  }

  // * Create the questions and select a random question as the answer
  const questions = pokemonList.map(p => new Question(p));
  questions[getRandomInt(0, questions.length-1)].isAnswer = true;

  return questions;
}

const Quiz = (props) => {
  const numberOfQuestions = 4;
  const { pokedex } = props;
  const { pokedexEntries: {nodes: pokedexEntries}} = pokedex;
  // * Return list of pokemon who have not been caught
  const availablePokemon = pokedexEntries.filter(e => e.caught === false).map(e => e.pokemon);
  const questions = generateQuestions(numberOfQuestions, availablePokemon);
  const answer = questions.filter(q => q.isAnswer)[0];

  console.log('questions', questions)
  console.log('answer', answer)

  return (
    <div>
      <img src={getPokemonImage(answer.pokemon.pokemonId)} alt={answer.pokemon.name} />
      <form>
        {questions.map(q => {
          const { pokemon: {pokemonId, name}} = q;
          return (
            <Fragment key={pokemonId}>
              <input type="radio" id={pokemonId} name={pokemonId} value={name} />
              <label htmlFor={pokemonId}>{name}</label>
            </Fragment>
          );
        })}
      </form>
    </div>
  );
};

export default Quiz;