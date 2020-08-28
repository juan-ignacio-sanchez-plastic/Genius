export default class CardSchema {
  constructor(front, answer, type, multipleChoiceIncorrectAnswers) {
    this.key = null;
    this.front = front;
    this.answer = answer;
    this.type = type;
    this.multipleChoiceIncorrectAnswers = multipleChoiceIncorrectAnswers;
    this.lastReview = Date.now();
    this.nextReview = Date.now();
  }
}
