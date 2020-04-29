import React from 'react';
import styled from 'styled-components';

import { getPokemonImage } from '../lib/helpers';
import Title from './Title';

import backgroundImage from '../static/background.jpg'
import Pokedex from './Pokedex';

const QuizContent = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
`;

const MysteryPokemonBreakPoint = '900px';

const MysteryPokemonContainer = styled.div`
  display: grid;
  grid-row-start: span 2;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: left;
  @media (min-width: ${MysteryPokemonBreakPoint}) {
    grid-template-columns: 2fr 1fr;
  }
`;

const MysteryPokemonStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 4fr;
  align-items: center;

  .title, .pokemon {
    margin: 0 auto;
  }
`;

const PokedexStyles = styled.div`
  display: none;
  background-color: var(--surface);
  border: 1px solid var(--button-shadow);
  @media (min-width: ${MysteryPokemonBreakPoint}) {
    overflow-y: auto;
    display: block;
  }
`;

const PokedexTitle = styled.h2`
  font-family: 'VT323', monospace;
  font-size: 32px;
  text-align: center;
`;

const MysteryPokemon = styled.div`
  align-self: center;
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
`;

const Questions = styled.form`
  display: grid;
  background-color: white;
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
  font-family: 'VT323', monospace;
  font-size: 36px;
  &:hover {
    background-color: lightgray;
  }
  label {
    cursor: pointer;
  }
`;



const Quiz = (props) => {
  const { questions, answer, onAnswerSelected, answerIsCorrect, pokedex } = props;


  return (
    <QuizContent>
      <MysteryPokemonContainer>
        <MysteryPokemonStyles className="mystery-pokemon">
          <Title className="title" />
          <MysteryPokemon className={`pokemon ${answerIsCorrect ? 'correct' : ''}`} pokemonId={answer.pokemon.pokemonId} aria-label={answer.pokemon.name} />
        </MysteryPokemonStyles>
        <PokedexStyles className="pokedex">
          <PokedexTitle>Pokedex</PokedexTitle>
          <Pokedex pokedex={pokedex} />
        </PokedexStyles>
      </MysteryPokemonContainer>
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
    </QuizContent>
  );
};

export default Quiz;