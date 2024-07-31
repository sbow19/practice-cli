import { TwoPlayer } from '#features/hangman_helper.js';
import { removeLines } from '#helper/stdout_funcs.js';
import timeout from '#helper/timeout.js';

const twoPlayer = async (): Promise<void> => {
	//Initialise two player game
	const twoPlayerGame = new TwoPlayer();

	//Prompt user names
	await twoPlayerGame.getPlayerOneName();
	await removeLines(2);
	await twoPlayerGame.getPlayerTwoName();
	await removeLines(2);

	//Select difficulty of games
	await twoPlayerGame.getGameDifficulty();
	await removeLines(2);

	//Select no of games
	await twoPlayerGame.selectNoOfGames();
	await removeLines(2);

	//Set current player
	twoPlayerGame.currentPlayer = twoPlayerGame.playerOneName;

	while (twoPlayerGame.isGameActive) {
		//Reset values
		twoPlayerGame.resetTurn();	
		//Check if a player has won
		if (twoPlayerGame.playerOneScore === twoPlayerGame.noOfGames) {
			//Player one wins
			console.log(`${twoPlayerGame.playerOneName} wins!`);
			twoPlayerGame.isGameActive = false;
			continue
		} else if (twoPlayerGame.playerTwoScore === twoPlayerGame.noOfGames) {
			//PLayer two wins
			console.log(`${twoPlayerGame.playerTwoName} wins!`);
			twoPlayerGame.isGameActive = false;
			continue
		}

		//Set lives left
		twoPlayerGame.livesLeft = twoPlayerGame.gameDifficulty;

		//Prompt player for a word
		await twoPlayerGame.getCurrentWord();

		let isTurnActive = true;
		while (isTurnActive) {
			//Programmatically generate new game screen every turn
			twoPlayerGame.generateGameScreen();

			//Get player's guess
			const playerGuess = await twoPlayerGame.getPlayerGuess(twoPlayerGame.currentPlayer);

            

			if(playerGuess.guessType === "full"){

				//Add guess string to game state object
				twoPlayerGame.guessString = playerGuess.guessString; 

			} else if (playerGuess.guessType === "single"){

				//Add letter to guessed letter
				twoPlayerGame.addGuessedLetter(playerGuess.guessString);

			}
			
			//Check if player won
			const playerWon = twoPlayerGame.doesPlayerWin();

			//Update scores and advance to next round
			if (playerWon) {
				twoPlayerGame.playerWonRound();
				isTurnActive = false;
				console.log(`${twoPlayerGame.currentPlayer} wins this round!`);
				await timeout(2000);
				await removeLines(3);
				continue;
			}

			//Advance to next turn, unless all turns used up, or player wins
			twoPlayerGame.livesLeft--;
			if (twoPlayerGame.livesLeft === 0) {
				isTurnActive = false; //End turn
				console.log(`${twoPlayerGame.currentPlayer} loses this round!`);
				await timeout(2000);
				await removeLines(3);
				continue;
			}
		}

		//Change player turn
		if (twoPlayerGame.playerOneName === twoPlayerGame.currentPlayer) {
			twoPlayerGame.currentPlayer = twoPlayerGame.playerTwoName;
		} else {
			twoPlayerGame.currentPlayer = twoPlayerGame.playerOneName;
		}
	}
};

export default twoPlayer;
