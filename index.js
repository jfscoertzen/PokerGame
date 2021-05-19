if (require.main === module) {
    require('./src/CardGame.js')({ Debug: true }).Start();;
} else {
    module.exports = require('./src/CardGame.js');
}
