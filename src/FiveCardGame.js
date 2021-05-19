const { decks } = require('cards');
const evaluateHand = require('./EvaluateHand.js');

/**
 * Standard Five Card Poker Game
 * @param {Object} CardGame Main Card Game object
 * @returns 
 */
const FiveCardGame = (CardGame) => {
    const _gameType = CardGame.GameType;
    CardGame.NumberOfPlayers = 1;
    CardGame.ShuffleCount = 3;
    CardGame.PlayerHandCount = 5;

    this.CardDeck = null;
    this.Players = [];

    /**
     * Prepare the game
     * @returns Returns the game object
     */
    this.PrepGame = () => {
        if (CardGame.Debug) CardGame.DebugPass(`(${_gameType}) Preparing Game.`);

        // Prepare a standard card deck
        this.CardDeck = new decks.StandardDeck({ jokers: 0 });

        // Create the players
        for (let i = 0; i < CardGame.NumberOfPlayers; i++) {
            this.Players.push(require('./Player.js')(this));
        }

        return this;
    }

    /**
     * Start the game
     * @returns The game object
     */
    this.StartGame = () => {
        return new Promise((resolve, reject) => {
            if (this.CardDesk !== null) {
                // Game mechanic: Shuffle the desk first
                for (let i = 0; i < CardGame.ShuffleCount; i++) {
                    if (CardGame.Debug) CardGame.DebugPass(`(${_gameType}) Shuffling...`);
                    this.CardDeck.shuffleAll();
                }

                // Game mechanic: Give the players random cards
                this.Players.forEach(player => {
                    if (CardGame.Debug) CardGame.DebugPass(`(${_gameType}) Player, ${player.Name}, drawing ${CardGame.PlayerHandCount} cards.`);
                    player.Hand = this.CardDeck.draw(5);
                });

                resolve();
            } else {
                reject(new Error(`(${_gameType}) The Game needs to be prepared first.`));
            }
        });
    }

    /**
     * Get the player's hand
     * @param {Number} PlayerIndex The index of the player, or...
     * @param {String} PlayerName The name of the player 
     */
    this.GetPlayerHand = ({
        PlayerIndex,
        PlayerName
    }) => {
        if (typeof PlayerIndex !== 'undefined') {
            return this.Players[parseFloat(PlayerIndex)].Hand;
        } else if (typeof PlayerName !== 'undefined') {
            return this.Players.find(i => i.Name === PlayerName).Hand;
        } else {
            throw new Error('Require player index or name');
        }
    };

    /**
     * Print the provided player's current hand
     * @param {Array} Hand The player's current hand to print.
     * @param {Number} Type The type of printing, 1 - Standard unicode, 2 - Unicode and String Names
     */
    this.PlayerHand = ({
        Hand = [],
        Type = 1
    }) => {
        switch (Type) {
            // Standard hand display
            case 1:
                return (Hand.map(hand => hand.unicode).toString().split(',').join(' '));
            // Detailed hand display
            case 2:
                return (Hand.map(hand => `${hand.unicode} ${hand.rank.shortName}${hand.suit.unicode}`).toString().split(',').join(' '));
            // Evaluation display (used to rate hand)
            case 3:
                return (Hand.map(hand => `${((hand.rank.shortName === '10') ? 'T' : hand.rank.shortName)}${hand.suit.name.toUpperCase()[0]}`).toString().split(',').join(' '));
        }

    };

    /**
     * Get the current game status
     * @returns The game status
     */
    this.GameStatus = () => {
        let returnVal = [`(${_gameType})`];

        this.Players.forEach((player, playerIndex) => {
            returnVal.push(`[Player Hand] *${player.Name}* ${this.PlayerHand({ Hand: this.GetPlayerHand({ PlayerIndex: playerIndex }) })}`);
        });

        return returnVal.toString().split('),').join(') ');
    };

    /**
     * Get the current game ranking
     * @returns The game ranking
     */
    this.GameRanking = () => {
        let returnVal = [`(${_gameType})`];

        this.Players.forEach((player, playerIndex) => {
            let _playerHandString = this.PlayerHand({ Hand: this.GetPlayerHand({ PlayerIndex: playerIndex }), Type: 3 });
            let _evaluateHand = evaluateHand({ PlayerHand: _playerHandString });
            returnVal.push(`[Player Ranking] *${player.Name}* Score: ${_evaluateHand.score} Rank: ${_evaluateHand.rank}`);
        });

        return returnVal.toString().split('),').join(') ');
    };

    return this;
}

module.exports = FiveCardGame;