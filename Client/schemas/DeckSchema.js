export default class DeckSchema {
  constructor(title) {
    this.key = Math.round(Math.random() * 10000000000000000000000000).toString();
    this.title = title;
    this.cards = [];
    this.creationDate = Date.now();
  }
}
