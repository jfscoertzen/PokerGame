const nonDebug = { Debug: false };
const fiveCardGame = require('./../src/FiveCardGame.js')(nonDebug);

describe('Five Card Game Test', () => {
    it('Prepare Game', () => {
        let prepObject = fiveCardGame.PrepGame();
        let checkPlayers = prepObject.Players.length > 0;
        expect(checkPlayers).toBe(true);
    });

    it('Start Game', () => {
        fiveCardGame.StartGame().then(() => {
            expect(fiveCardGame.Players.length).toBe(1);
            expect(fiveCardGame.Players[0].Hand.length).toBe(5);
        }).catch((error) => {
            expect(1).toBe(0);
        });
    });

    let playerHand = null;
    it('Get Player Hand by Player Name', () => {
        playerHand = fiveCardGame.GetPlayerHand({ PlayerName: 'Default Player' });
        expect(playerHand.length).toBe(5);
    });

    it('Print Player Hand', () => {
        let playerHandString = fiveCardGame.PlayerHand({ Hand: playerHand });
        //playerHandString.indexOf('[Player Hand]') !== -1 && playerHandString.indexOf('*Default Player*') !== -1
        expect(playerHandString.length === 14).toBe(true);
    });

    it('Get Game Status', () => {
        let gameStatus = fiveCardGame.GameStatus();
        expect(gameStatus.indexOf('[Player Hand]') !== -1 && gameStatus.indexOf('*Default Player*') !== -1).toBe(true);
    });

    it('Get Game Ranking', () => {
        let gameRanking = fiveCardGame.GameRanking();
        expect(gameRanking.indexOf('[Player Ranking]') !== -1 && gameRanking.indexOf('Rank: ') !== -1).toBe(true);
    });
});