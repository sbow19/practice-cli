import { TwoPlayer } from '#features/hangman_helper.js';
import { removeLines } from '#helper/stdout_funcs.js';
import timeout from '#helper/timeout.js';
const twoPlayer = async () => {
    const twoPlayerGame = new TwoPlayer();
    await twoPlayerGame.getPlayerOneName();
    await removeLines(2);
    await twoPlayerGame.getPlayerTwoName();
    await removeLines(2);
    await twoPlayerGame.getGameDifficulty();
    await removeLines(2);
    await twoPlayerGame.selectNoOfGames();
    await removeLines(2);
    twoPlayerGame.currentPlayer = twoPlayerGame.playerOneName;
    while (twoPlayerGame.isGameActive) {
        twoPlayerGame.resetTurn();
        if (twoPlayerGame.playerOneScore === twoPlayerGame.noOfGames) {
            console.log(`${twoPlayerGame.playerOneName} wins!`);
            twoPlayerGame.isGameActive = false;
            continue;
        }
        else if (twoPlayerGame.playerTwoScore === twoPlayerGame.noOfGames) {
            console.log(`${twoPlayerGame.playerTwoName} wins!`);
            twoPlayerGame.isGameActive = false;
            continue;
        }
        twoPlayerGame.livesLeft = twoPlayerGame.gameDifficulty;
        await twoPlayerGame.getCurrentWord();
        let isTurnActive = true;
        while (isTurnActive) {
            twoPlayerGame.generateGameScreen();
            const playerGuess = await twoPlayerGame.getPlayerGuess(twoPlayerGame.currentPlayer);
            if (playerGuess.guessType === "full") {
                twoPlayerGame.guessString = playerGuess.guessString;
            }
            else if (playerGuess.guessType === "single") {
                twoPlayerGame.addGuessedLetter(playerGuess.guessString);
            }
            const playerWon = twoPlayerGame.doesPlayerWin();
            if (playerWon) {
                twoPlayerGame.playerWonRound();
                isTurnActive = false;
                console.log(`${twoPlayerGame.currentPlayer} wins this round!`);
                await timeout(2000);
                await removeLines(3);
                continue;
            }
            twoPlayerGame.livesLeft--;
            if (twoPlayerGame.livesLeft === 0) {
                isTurnActive = false;
                console.log(`${twoPlayerGame.currentPlayer} loses this round!`);
                await timeout(2000);
                await removeLines(3);
                continue;
            }
        }
        if (twoPlayerGame.playerOneName === twoPlayerGame.currentPlayer) {
            twoPlayerGame.currentPlayer = twoPlayerGame.playerTwoName;
        }
        else {
            twoPlayerGame.currentPlayer = twoPlayerGame.playerOneName;
        }
    }
};
export default twoPlayer;
//# sourceMappingURL=hangman_two.js.map