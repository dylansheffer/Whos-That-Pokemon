export class Question {
  pokemon = {}
  isAnswer = false;

  /**
   *Creates an instance of Question.
   * @param {*} pokemon
   * @param {*} isAnswer
   * @memberof Question
   */
  constructor(pokemon, isAnswer = false) {
    this.pokemon = pokemon;
    this.isAnswer = isAnswer;
  }
}