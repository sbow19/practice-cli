import { OnePlayer } from '#features/hangman_helper.js';
import { checkDefaultExists } from '#helper/state.js';
import { removeLines } from '#helper/stdout_funcs.js';
import timeout from '#helper/timeout.js';
const onePlayer = async () => {
    const { configSettings } = await checkDefaultExists();
    const onePlayerGame = new OnePlayer(configSettings?.name ?? "User");
    await onePlayerGame.getGameDifficulty();
    await removeLines(2);
    const theme = await onePlayerGame.selectTheme();
    await onePlayerGame.getCurrentWord(theme);
    onePlayerGame.livesLeft = onePlayerGame.gameDifficulty;
    let isTurnActive = true;
    while (isTurnActive) {
        onePlayerGame.generateGameScreen();
        const playerGuess = await onePlayerGame.getPlayerGuess(onePlayerGame.playerName);
        if (playerGuess.guessType === "full") {
            onePlayerGame.guessString = playerGuess.guessString;
        }
        else if (playerGuess.guessType === "single") {
            onePlayerGame.addGuessedLetter(playerGuess.guessString);
        }
        const playerWon = onePlayerGame.doesPlayerWin();
        if (playerWon) {
            isTurnActive = false;
            console.log(`You win!`);
            await timeout(2000);
            await removeLines(3);
            continue;
        }
        onePlayerGame.livesLeft--;
        if (onePlayerGame.livesLeft === 0) {
            isTurnActive = false;
            console.log(`You lose, the answer is ${onePlayerGame.currentWord}...`);
            await timeout(2000);
            await removeLines(3);
            continue;
        }
    }
};
export default onePlayer;
//# sourceMappingURL=hangman_one.js.map