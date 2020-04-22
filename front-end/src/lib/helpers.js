import { useEffect } from "react";

export const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getPokemonImage = pokemonId => require(`../static/pokemon/${pokemonId}.png`)

// * Convenience function for running an effect hook on component mount
export const useMountEffect = (func) => useEffect(func, []);