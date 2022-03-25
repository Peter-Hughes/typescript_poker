class Card {
    constructor(public rank: Rank, public suit: Suit) {
    }

    toString(): string {
        return `${this.rank}${this.suit}`;
    }
}