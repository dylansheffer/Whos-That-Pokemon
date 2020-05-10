import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from '@apollo/react-hooks';
import wait from 'waait';

import { Question } from '../objects/Question';
import { getRandomInt, useMountEffect } from '../lib/helpers';
import { CATCH_POKEMON, SEE_POKEMON, COMPLETE_POKEDEX, RESET_ENTRY } from '../actions/mutations';
import Quiz from './Quiz';

import 'react-toastify/dist/ReactToastify.css';

const selectUniquePokemon = (pokemonList, masterList) => {
  const pokemon = masterList[getRandomInt(0, masterList.length)];
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
  if (numberOfQuestions < availablePokemon.length) {
    for (let i = 0; i < numberOfQuestions; i++) {
      const uniquePokemon = selectUniquePokemon(pokemonList, availablePokemon);
      pokemonList.push(uniquePokemon);
    }
  }
  else {
    for (let i = 0; i < availablePokemon.length; i++) {
      pokemonList.push(selectUniquePokemon(pokemonList, availablePokemon));
    }
  }
  // * Create the questions and select a random question as the answer
  const questions = pokemonList.map(p => new Question(p));

  if (questions.length > 0) {
    questions[getRandomInt(0, questions.length - 1)].isAnswer = true;
  }

  return questions;
}

const checkAnswer = (selectedPokemonId, answerPokemonId) => `${selectedPokemonId}` === `${answerPokemonId}`;

// * Game component will control the state of the game, while the Quiz component will just render the app's state. That way I can more easily control reloading the quiz.
const Game = (props) => {
  const numberOfQuestions = 4;
  const timeBetweenQuizzes = 3000;
  const [pokedex, setPokedex] = useState(props.pokedex);
  const { pokedexEntries: { nodes: pokedexEntries } } = pokedex;
  const { isComplete } = pokedex;

  const availablePokemon = pokedexEntries.filter(e => e.caught === false).map(e => e.pokemon);
  const [seePokemon, { loading: seePokemonLoading }] = useMutation(SEE_POKEMON);
  const [catchPokemon] = useMutation(CATCH_POKEMON);
  const [completePokedex] = useMutation(COMPLETE_POKEDEX);
  const [resetEntry] = useMutation(RESET_ENTRY);
  const [questions, setQuestions] = useState([]);
  const [answerIsCorrect, setAnswerIsCorrect] = useState();
  const answer = questions?.filter(q => q.isAnswer)[0];

  // * Update the answer as "seen" in the database when its dependent variables change
  useEffect(() => {
    const answer = questions?.filter(q => q.isAnswer)[0];
    if (answer) {
      seePokemon({ variables: { pokedexId: pokedex.pokedexId, pokemonId: answer.pokemon.pokemonId } })
    }
  }, [questions, pokedex.pokedexId, seePokemon]);

  useEffect(() => {
    if (answerIsCorrect === true) {
      toast.success(`You caught a ${answer.pokemon.name}!`);
    }
    else if (answerIsCorrect === false) {
      toast.error(`Wild Pokemon ran away...`);
    }
  }, [answerIsCorrect, answer]);

  useMountEffect(() => { setQuestions(generateQuestions(numberOfQuestions, availablePokemon)); });

  const onAnswerSelected = (e) => {
    const selectedPokemonId = e.target.value;

    // ? Store local variable here because `answerIsCorrect` will not be updated until next render
    const selectedAnswerCorrect = checkAnswer(selectedPokemonId, answer.pokemon.pokemonId);

    // * Check If Answer is Correct
    setAnswerIsCorrect(selectedAnswerCorrect);

    // * If correct, set that pokemon as caught
    catchPokemon({ variables: { pokedexId: pokedex.pokedexId, pokemonId: answer.pokemon.pokemonId, catchSuccessful: selectedAnswerCorrect } })
      // * Update the pokedex with the latest information
      .then(({ data: { updatePokedexEntry: { pokedex } } }) => setPokedex(pokedex))
      // * Check to see if the Pokedex is complete
      .then(() => {
        const { pokedexEntries: { nodes: entries } } = pokedex;
        const pokedexIsComplete = entries.every(e => e.caught);
        if (pokedexIsComplete) {
          completePokedex({ variables: { pokedexId: pokedex.pokedexId } })
        }
      })
      .then(async () => {
        // * Give the user some time to see the result before loading new questions
        await wait(timeBetweenQuizzes)
        setAnswerIsCorrect(undefined);
        setQuestions(generateQuestions(numberOfQuestions, availablePokemon));
      })
  }

  const onReset = () => {
    pokedexEntries.map(e => resetEntry({variables: {pokedexId: pokedex.pokedexId, pokemonId: e.pokemon.pokemonId}}))
  };

  if (isComplete) return (
    <>
      <p>Congratulations! You Win!</p>
      <button onClick={onReset}>Restart Game</button>
    </>
  )

  if (seePokemonLoading || questions.length <= 0) return <p>Loading...</p>;

  return (
    <>
      <ToastContainer autoClose={timeBetweenQuizzes} />
      <Quiz className={props.className} questions={questions} answer={answer} onAnswerSelected={onAnswerSelected} answerIsCorrect={answerIsCorrect} pokedex={pokedex} />
    </>
  );
};

export default Game;