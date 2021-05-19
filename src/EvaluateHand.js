const PokerHand = require('poker-hand-evaluator');

/**
 * Evaluate the player's hand
 * @param {Array} PlayerHand The player's hand 
 * @returns The description of the ranking of the current hand
 */
module.exports = ({
    PlayerHand = ''
}) => {
    const thisPokerHand = new PokerHand(PlayerHand);
    let description = thisPokerHand.describe();

    switch (description.rank) {
        case 'HIGH_CARD':
            description.rank = 'High Card';
            break;
        case 'ONE_PAIR':
            description.rank = 'One Pair';
            break;
        case 'TWO_PAIRS':
            description.rank = 'Two Pairs';
            break;
        case 'THREE_OF_A_KIND':
            description.rank = 'Three of a Kind';
            break;
        case 'STRAIGHT':
            description.rank = 'Straight';
            break;
        case 'FLUSH':
            description.rank = 'Flush';
            break;
        case 'FULL_HOUSE':
            description.rank = 'Flull House';
            break;
        case 'FOUR_OF_A_KIND':
            description.rank = 'Four of a Kind';
            break;
        case 'STRAIGHT_FLUSH':
            description.rank = 'HStraight Flush';
            break;
        case 'ROYAL_FLUSH':
            description.rank = 'Royal Flush';
            break;
    }

    return description;
}