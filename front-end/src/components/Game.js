import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Question } from '../objects/Question';
import { getRandomInt, useMountEffect } from '../lib/helpers';
import { CATCH_POKEMON, SEE_POKEMON } from '../actions/mutations';
import Quiz from './Quiz';

const selectUniquePokemon = (pokemonList, masterList) => {
  const pokemon = masterList[getRandomInt(0, masterList.length-1)];
  // * If the selected pokemon is in the pokemonList, select a new one
  if (pokemonList.includes(pokemon)) {
    return selectUniquePokemon(pokemonList, masterList);
  }
  else {
    return pokemon;
  }
}

// Generates a Set of questions
const generateQuestions = (numberOfQuestions, availablePokemon) => {
  let pokemonList = [];
  // * Generate the requested number of questions unless there are less available pokemon than requested
  if(numberOfQuestions < availablePokemon.length) {
    for (let i=0; i < numberOfQuestions; i++) {
      const uniquePokemon = selectUniquePokemon(pokemonList, availablePokemon);
      pokemonList.push(uniquePokemon);
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

const checkAnswer = (selectedPokemonId, answerPokemonId) => `${selectedPokemonId}` === `${answerPokemonId}`;

// * Game component will control the state of the game, while the Quiz component will just render the app's state. That way I can more easily control reloading the quiz.
const Game = (props) => {
  const numberOfQuestions = 4;
  const { pokedex } = props;
  const { pokedexEntries: {nodes: pokedexEntries}} = pokedex;
  const availablePokemon = pokedexEntries.filter(e => e.caught === false).map(e => e.pokemon);
  const [seePokemon, { data: seePokemonData, loading: seePokemonLoading }  ] = useMutation(SEE_POKEMON);
  const [catchPokemon, { data: catchPokemonData }] = useMutation(CATCH_POKEMON);
  const [questions, setQuestions] = useState([]);
  const answer = questions?.filter(q => q.isAnswer)[0];

  // * Update the answer as "seen" in the database when its dependent variables change
  useEffect(() => {
    const answer = questions?.filter(q => q.isAnswer)[0];
    if (answer) {
      seePokemon({variables: {pokedexId: pokedex.pokedexId, pokemonId: answer.pokemon.pokemonId}})
    }
  }, [questions, pokedex.pokedexId, seePokemon]);

  useMountEffect(() => {setQuestions(generateQuestions(numberOfQuestions, availablePokemon));});

  const onAnswerSelected = (e) => {
    const selectedPokemonId = e.target.value;
    // 1. Check If Answer is Correct
    const answerIsCorrect = checkAnswer(selectedPokemonId, answer.pokemon.pokemonId);
    // 2. If correct, set that pokemon as caught
    catchPokemon({variables: {pokedexId: pokedex.pokedexId, pokemonId: answer.pokemon.pokemonId, catchSuccessful: answerIsCorrect}}).then(setQuestions(generateQuestions(numberOfQuestions, availablePokemon)))
    // 3. Show message whether they got it right or wrong
    // 4. Refresh the game

  }

  if(seePokemonLoading || questions.length <= 0) return <p>Loading...</p>;

  return (
    <Quiz questions={questions} answer={answer} onAnswerSelected={onAnswerSelected} />
  );
};

export default Game;