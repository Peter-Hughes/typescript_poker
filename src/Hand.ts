class PokerHand {
  private readonly orderedRanks: Rank[];

  constructor(public hand: ReadonlyArray<Card>) {
    this.orderedRanks = ["A", "K", "Q", "J", 10, 9, 8, 7, 6, 5, 4, 3, 2];
  }

  toString(): string {
    return `[ ${this.hand.join(" ")} ] - ${this.name()}`;
  }

  private name(): string {
    if (this.isRoyalFlush()) return "Royal Flush"
    if (this.isStraightFlush()) return "Straight Flush"
    if (this.isFourOfAKind()) return "Four Of A Kind"
    if (this.isFullHouse()) return "Full House"
    if (this.isFlush()) return "Flush"
    if (this.isStraight()) return "Straight"
    if (this.isThreeOfAKind()) return "Four Of A Kind"
    if (this.isTwoPair()) return "Two Pair"
    if (this.isPair()) return "Pair"
    return "Highest Card"
  }

  private isRoyalFlush(): boolean {
    return this.isStraight() && this.isAllCardsHigh();
  }

  private isStraightFlush(): boolean {
    return this.isStraight() && this.isFlush();
  }

  private isFullHouse(): boolean {
    return this.isThreeOfAKind() && this.isPair();
  }

  private isFlush(): boolean {
    return this.hand.every(card => card.rank === this.hand[0].rank);
  }

  private isStraight(): boolean {
    const rankOrder = this.orderedRanks.join("");

    const handRanks = this.orderRanks().join("");

    return rankOrder.includes(handRanks);
  }

  private isTwoPair(): boolean {
    const ranks: Rank[] = this.hand.map(card => card.rank);

    const count: number[] = this.countRanks(ranks);

    return count.filter(x => x === 2).length === 2;
  }

  private isFourOfAKind(): boolean {
    return this.isOfN(3);
  }

  private isThreeOfAKind(): boolean {
    return this.isOfN(3);
  }

  private isPair(): boolean {
    return this.isOfN(2);
  }

  private isOfN(n: number): boolean {
    const ranks: Rank[] = this.hand.map(card => card.rank);

    const count: number[] = this.countRanks(ranks);

    return count.some(x => x > n);
  }

  private countRanks(ranks: Rank[]): number[] {
    const used: Rank[] = [];
    const count = [];

    for (const element of ranks) {
      if (!used.includes(element)) {
        used.push(element);
        count.push(ranks.filter(x => x === element).length);
      }
    }

    return count;
  }

  private isAllCardsHigh(): boolean {
    const highNumbers: Rank[] = ["A", 10, "J", "Q", "K"];
    return this.hand.every(card => {
      return highNumbers.some(rank => rank === card.rank);
    });
  }

  private orderRanks(): Rank[] {
    const ranks: Rank[] = this.hand.map(card => card.rank);

    return ranks.sort((a, b) => {
      return this.orderedRanks.indexOf(a) - this.orderedRanks.indexOf(b);
    });
  }
}

