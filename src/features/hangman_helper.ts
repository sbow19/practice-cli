//Set of functions and properties to manage hangman games

import { input, select } from '@inquirer/prompts';
import { hangmanTitle } from '#helper/fonts.js';
import { hangmanHeaderBox, mainDescriptionBox } from '#helper/boxes.js';
import { clearScreen } from '#helper/stdout_funcs.js';

class HangmanGame {
	constructor() {
		this.isGameActive = true;
		this.gameDifficulty = 12;
        this.livesLeft = this.gameDifficulty;
		this.currentWord = '';
		this.guessedWordString = '';
		this.guessedLetters = [];
		this.currentGameScreen = 'Welcome to Hangman!';
	}

	isGameActive: boolean;
	gameDifficulty: number;
    livesLeft: number;
	currentGameScreen: string;

	currentWord: string;
	guessedWordString: string;
	guessedLetters: Array<string | null>;

	async getGameDifficulty(): Promise<void> {
		const difficulty = await select({
			message: 'Please select no of turns: ',
			choices: [
				{
					name: 'Easy (12 turns)',
					value: 12,
				},
				{
					name: 'Medium (10 turns)',
					value: 10,
				},
				{
					name: 'Hard (8 turns)',
					value: 8,
				},
			],
		});

		this.gameDifficulty = difficulty;
	}

    #convertGuessedLettersToString(){

        

    }



	getCurrentGameScreen() {
		return this.currentGameScreen;
	}
}

export class OnePlayer extends HangmanGame {}

export class TwoPlayer extends HangmanGame {
	constructor() {
		super();
		this.playerOneName = 'Player 1';
		this.playerTwoName = 'Player 2';
		this.noOfGames = 2;
		this.playerOneScore = 0;
		this.playerTwoScore = 0;
		this.currentPlayer = this.playerOneName;

		this.currentGameScreen = 'Welcome to two player Hangman!';
	}

	//Game settings
	playerOneName: string;
	playerTwoName: string;
	noOfGames: number;

	//Game data
	playerOneScore: number;
	playerTwoScore: number;
	currentPlayer: string;

	async getPlayerOneName(): Promise<void> {
		let validationLoop = true;
		while (validationLoop) {
			const playerOne = await input({
				message: 'Player one name: ',
			});

			const validationResult = this.#validatePlayerNameInput(playerOne);

			if (validationResult === 'try again') {
				//Error in name validation
				continue;
			} else if (validationResult === 'default') {
				//No entry defaults to Player 1 or Player 2
				validationLoop = false;
			} else if (validationResult === 'okay') {
				this.playerOneName = playerOne;
				validationLoop = false;
			}
		}
	}

	async getPlayerTwoName(): Promise<void> {
		let validationLoop = true;
		while (validationLoop) {
			const playerTwo = await input({
				message: 'Player two name: ',
			});

			const validationResult = this.#validatePlayerNameInput(playerTwo);

			if (validationResult === 'try again') {
				//Error in name validation
				continue;
			} else if (validationResult === 'default') {
				//No entry defaults to Player 1 or Player 2
				validationLoop = false;
			} else if (validationResult === 'okay') {
				this.playerTwoName = playerTwo;
				validationLoop = false;
			}
		}
	}

	#validatePlayerNameInput(playerOneName: string): ValidationResult {
		if (!playerOneName.trim()) {
			//
			return;
		}
	}

	#validatePlayerWordInput(wordInput: string): ValidationResult {
		if (!playerOneName.trim()) {
			//
			return;
		}
	}

	async selectNoOfGames(): Promise<void> {
		const noOfGames = await select({
			message: 'Please select score to reach: ',
			choices: [
				{
					name: '2',
					value: 2,
				},
				{
					name: '3',
					value: 3,
				},
				{
					name: '4',
					value: 4,
				},
			],
		});

		this.noOfGames = noOfGames;
	}

	async getCurrentWord(): Promise<void> {
		let validationLoop = true;
		while (validationLoop) {
			const currentWord = await input({
				message: `${this.currentPlayer}, please enter a word: `,
			});

			const validationResult = this.#validatePlayerWordInput(currentWord);

			if (validationResult === 'try again') {
				//Error in name validation
				continue;
			} else if (validationResult === 'okay') {
				this.currentWord = currentWord;
				validationLoop = false;
			}
		}
	}

	generateGameScreen(): string {
		let gameScreen = '';

		//Title
		const hangmanTitleText = hangmanTitle('Hangman');
		const hangmanTitleGraphic = hangmanHeaderBox(hangmanTitleText);
		clearScreen([hangmanTitleGraphic]);

		gameScreen += hangmanTitleGraphic;
		gameScreen += '\n \n'; //Add two lines between header and game screen

		//User scores  line
		const userScoreLine = `${this.playerOneName} score: ${this.playerOneScore} \t\t ${this.playerTwoName} score: ${this.playerTwoScore}`;

        gameScreen += userScoreLine;
        gameScreen += '\n'; //Add one line

		//Current user lives left line
        const livesLeft = `\t ${this.currentPlayer} lives left: ${this.livesLeft}`;

        gameScreen += livesLeft;
        gameScreen += '\n'; //Add one line

		//Hangman guessed word
        const guessedWordLine = this.guessedWordString;

        gameScreen += guessedWordLine;
        gameScreen += '\n'; //Add one line

		//Letters chosen letters line
        const guessedLettersString = this.#convertGuessedLettersToString();

        gameScreen += guessedLettersString;
        gameScreen += '\n \n'; //Add two lines

		return gameScreen;
	}
}
