export class Question {
  constructor(pokemon, isAnswer = false) {
    this.pokemon = pokemon;
    this.isAnswer = isAnswer;
  }
}