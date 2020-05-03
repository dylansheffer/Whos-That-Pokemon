import React from 'react';
import styled from 'styled-components';

import { getPokemonImage } from '../lib/helpers';
import Title from './Title';

import backgroundImage from '../static/background.jpg'
import Pokedex from './Pokedex';

const QuizLayout = styled.div`
  height: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 2fr 1fr;
  .mystery {
    grid-column: 1 / -1;
    grid-row: 1 / 1;
  }
  .pokedex {
    display: none;
  }
  .questions {
    grid-column: 1 / -1;
    grid-row: 2 / -1;
  }
  @media (min-width: 900px) {
    .mystery {
      grid-column: 1 / span 4;
      grid-row: 1 / span 1;
    }
    .pokedex {
      display: block;
      grid-column: 5 / -1;
      grid-row: 1 / span 1;
      overflow: hidden;
    }
  }
`;

const MysteryPokemonContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: left;
`;

const MysteryPokemonStyles = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 4fr;
  align-items: center;

  .title {
    grid-column: span 2;
  }

  .pokemon {
    grid-column: 1 / 1;
  }
`;

const PokedexContainer = styled.div``;



const MysteryPokemon = styled.div`
  filter: brightness(0);
  &&.correct {
    filter: brightness(1);
  }
  width: 300px;
  height: 300px;
  background-image: url(${props => getPokemonImage(props.pokemonId)});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 auto;
`;

const Questions = styled.form`
  display: grid;
  background-color: var(--pokemon-ui-surface);
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  border: 8px solid black;
  .question:nth-child(1) {
    border-right: 4px solid black;
    border-bottom: 4px solid black;
  }
  .question:nth-child(2) {
    border-left: 4px solid black;
    border-bottom: 4px solid black;
  }
  .question:nth-child(3) {
    border-right: 4px solid black;
    border-top: 4px solid black;
  }
  .question:nth-child(4) {
    border-left: 4px solid black;
    border-top: 4px solid black;
  }
`;

const Question = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: var(--pixel-font);
  font-size: 36px;
  &:hover {
    background-color: lightgray;
  }
  label {
    cursor: pointer;
  }
`;



const Quiz = (props) => {
  const { questions, answer, onAnswerSelected, answerIsCorrect, pokedex, className } = props;


  return (
    <QuizLayout className={className}>
      <MysteryPokemonContainer className="mystery">
        <MysteryPokemonStyles className="mystery-pokemon">
          <Title className="title" />
          <MysteryPokemon className={`pokemon ${answerIsCorrect ? 'correct' : ''}`} pokemonId={answer.pokemon.pokemonId} aria-label={answer.pokemon.name} />
        </MysteryPokemonStyles>
      </MysteryPokemonContainer>
      <PokedexContainer className="pokedex">
        <Pokedex pokedex={pokedex} />
      </PokedexContainer>
      <Questions className="questions">
        {questions ? questions.map(q => {
          const { pokemon: { pokemonId, name } } = q;
          return (
            <Question className="question" key={pokemonId}>
              <input className="visually-hidden" type="radio" id={pokemonId} name="quiz" value={pokemonId} onChange={onAnswerSelected} />
              <label htmlFor={pokemonId}>{name}</label>
            </Question>
          );
        }) : <p>Loading...</p>}
      </Questions>
    </QuizLayout>
  );
};

export default Quiz;