import { OnePlayer } from '#features/hangman_helper.js';
import { checkDefaultExists } from '#helper/state.js';
import { removeLines } from '#helper/stdout_funcs.js';
import timeout from '#helper/timeout.js';

const onePlayer = async ():Promise<void> =>{

    //fetch user name
    const { configSettings } = await checkDefaultExists();

    //Initialise one player game
	const onePlayerGame = new OnePlayer(configSettings?.name ?? "User");

    //Select difficulty of game
	await onePlayerGame.getGameDifficulty();
	await removeLines(2);

    //Select theme
    const theme = await onePlayerGame.selectTheme();

    //Fetch word
	await onePlayerGame.getCurrentWord(theme);

    //Set lives left
    onePlayerGame.livesLeft = onePlayerGame.gameDifficulty;

    //Start game loop
    let isTurnActive = true;
    while (isTurnActive) {
        //Programmatically generate new game screen every turn
        onePlayerGame.generateGameScreen();

        //Get player's guess
        const playerGuess = await onePlayerGame.getPlayerGuess(onePlayerGame.playerName);

        if(playerGuess.guessType === "full"){

            //Add guess string to game state object
            onePlayerGame.guessString = playerGuess.guessString; 

        } else if (playerGuess.guessType === "single"){

            //Add letter to guessed letter
            onePlayerGame.addGuessedLetter(playerGuess.guessString);

        }
        
        //Check if player won
        const playerWon = onePlayerGame.doesPlayerWin();

        //Update scores and advance to next round
        if (playerWon) {
            isTurnActive = false;
            console.log(`You win!`);
            await timeout(2000);
            await removeLines(3);
            continue;
        }

        //Advance to next turn, unless all turns used up, or player wins
        onePlayerGame.livesLeft--;
        if (onePlayerGame.livesLeft === 0) {
            isTurnActive = false; //End turn
            console.log(`You lose, the answer is ${onePlayerGame.currentWord}...`);
            await timeout(2000);
            await removeLines(3);
            continue;
        }
    }
	
}

export default onePlayer;