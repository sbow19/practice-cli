import { TwoPlayer } from "#features/hangman_helper.js";
const twoPlayer = () => {
    return new Promise(async (resolve) => {
        const twoPlayerGame = new TwoPlayer();
        await twoPlayerGame.getPlayerOneName();
        await twoPlayerGame.getPlayerTwoName();
        await twoPlayerGame.getGameDifficulty();
        await twoPlayerGame.selectNoOfGames();
        while (twoPlayerGame.isGameActive) {
            await twoPlayerGame.getCurrentWord();
            let isTurnActive = true;
            while (isTurnActive) {
                const gameScreen = twoPlayerGame.generateGameScreen();
                console.log(gameScreen);
            }
        }
    });
};
export default twoPlayer;
//# sourceMappingURL=hangman_two.js.map