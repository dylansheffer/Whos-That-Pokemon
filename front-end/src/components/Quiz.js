import React from 'react';
import styled from 'styled-components';

import { getPokemonImage } from '../lib/helpers';
import Title from './Title';

import backgroundImage from '../static/background.jpg'

const Page = styled.div`
  max-width: 600px;
`;
// * Controls how individual components are laid out and interact with one another
const QuizContent = styled.div`
  width: 100%;
  height: 100%;
  /* display: grid; */
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  .title {
    grid-column: 1 / -1;
    grid-row: 1;
  }
  .pokemon {
    grid-column: 2 / 2;
    grid-row: 2;
    justify-self: center;
  }
  .questions {
    grid-column: 1 / -1;
    grid-row: 3;
    justify-self: center;
  }
`;

const MysteryPokemonContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: left;
  width: 100%;
  height: 100%;
`;

const MysteryPokemon = styled.div`
  filter: brightness(0);
  &&.correct {
    filter: brightness(1);
  }
  width: 300px;
  height: 300px;
  min-height: 100px;
  min-width: 100px;
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
  height: 100%;
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
  const { questions, answer, onAnswerSelected, answerIsCorrect } = props;

  return (
    <Page>
      <QuizContent>
        <MysteryPokemonContainer>
          <Title className="title" />
          <MysteryPokemon className={`pokemon ${answerIsCorrect ? 'correct' : ''}`} pokemonId={answer.pokemon.pokemonId} aria-label={answer.pokemon.name} />
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
    </Page>
  );
};

export default Quiz;