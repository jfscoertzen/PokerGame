/**
 * Standard poker game that draws default 5 cards, shuffles them and checks the current hand
 * @param {String} GameType The type of game. Default: Five-card Game
 * @param {String} Debug Debug the current game
 * @param {Function} DebugPass The passing of debug information for printing
 * @returns Card Game object
 */
 module.exports = ({
	GameType = 'FiveCardGame',
	Debug = false,
	DebugPass = (message) => { console.log(message); }
}) => {
	this.Debug = Debug;
	this.DebugPass = DebugPass;
	this.GameType = GameType;

	/**
	 * The number of time the card deck must be shuffled
	 */
	this.ShuffleCount = -1;
	/**
	 * The number of cards in the player's hand
	 */
	this.PlayerHandCount = -1;
	/**
	 * The number of players in the game
	 */
	this.NumberOfPlayers = -1;

	if (Debug) this.DebugPass(`Initializing Game Object (${this.GameType})`);

	let _cardGameObject = new require(`./${GameType}.js`)(this);
	_cardGameObject.PrepGame();

	/**
	 * General function to start the game
	 */
	this.Start = () => {
		_cardGameObject.StartGame().then(() => {
			if (Debug) this.DebugPass(_cardGameObject.GameStatus());
			if (Debug) this.DebugPass(_cardGameObject.GameRanking());
		}).catch((error) => {
			console.error(error);
		});
	};

	return this;
}