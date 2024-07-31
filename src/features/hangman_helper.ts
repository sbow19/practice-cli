//Set of functions and properties to manage hangman games

import { input, select } from '@inquirer/prompts';
import { hangmanTitle } from '#helper/fonts.js';
import { hangmanHeaderBox } from '#helper/boxes.js';
import { clearScreen } from '#helper/stdout_funcs.js';
import chalk from 'chalk';
import { removeLines } from '#helper/stdout_funcs.js';
import fs from "fs/promises"


class HangmanGame {
	constructor() {
		this.isGameActive = true;
		this.gameDifficulty = 12;
		this.livesLeft = this.gameDifficulty;
		this.currentWord = '';
		this.guessedLetters = [];
		this.currentGameScreen = 'Welcome to Hangman!';
        this.guessString = ""
	}

	isGameActive: boolean;
	gameDifficulty: number;
	livesLeft: number;
	currentGameScreen: string;

	currentWord: string;
	guessedLetters: Array<string | null>;
    guessString: string;

	async getGameDifficulty(): Promise<void> {
		const difficulty = await select({
			message: 'Please select no of turns: ',
			choices: [
				{
					name: 'Easy (20 turns)',
					value: 20,
				},
				{
					name: 'Medium (15 turns)',
					value: 15,
				},
				{
					name: 'Hard (10 turns)',
					value: 10,
				},
			],
		});

		this.gameDifficulty = difficulty;
	}

	_convertGuessedWordToString(): string {
		const currentWordStringArray = this.currentWord.split('');

		const guessedWordStringArray = currentWordStringArray.map((character) => {
			//Return matched letter
			for (let guessedLetter of this.guessedLetters) {
				if (guessedLetter === character) {
					return chalk.red(character);
				}
			}

			const regex = /[?!\-,\s.]/;
			if (regex.test(character)) {
				return character;
			}

			//If character doesn't match any guessed characters, then we return ?
			return '?';
		});

		const guessedWordString = guessedWordStringArray.join('  ');

		return guessedWordString;
	}

	_convertGuessedLettersToString(): string {
		let guessedLettersString = 'Guessed letters: ';

		if (this.guessedLetters.length > 6) {
			const firstHalfOfArray = this.guessedLetters.slice(0, 6);
			const secondHalfOfArray = this.guessedLetters.slice(6);

			const firstHalfOfString = firstHalfOfArray.join(', ');
			const secondHalfOfString = secondHalfOfArray.join(', ');

			guessedLettersString += firstHalfOfString;
			guessedLettersString += '\n';
			guessedLettersString += secondHalfOfString;
		} else {
			guessedLettersString += this.guessedLetters.join(', ');
		}

		return guessedLettersString;
	}

	_generateUserLivesLeftString(currentPlayer = ''): string {
		let livesLeft: string;

		if (this.livesLeft > 10) {
			livesLeft = chalk.green(this.livesLeft);
		} else if (this.livesLeft > 5) {
			livesLeft = chalk.yellow(this.livesLeft);
		} else {
			livesLeft = chalk.red(this.livesLeft);
		}

		const livesLeftString = `${currentPlayer} lives left: ${livesLeft}`;

		return livesLeftString;
	}

	getCurrentGameScreen() {
		return this.currentGameScreen;
	}

	addGuessedLetter(guess: string) {
		this.guessedLetters.push(guess);
	}


	doesPlayerWin(): boolean {
        //Checks first whether user full guess matches challenge word, then checks single characters
        
        //Full guess match
        if(this.currentWord.toLowerCase() === this.guessString.toLowerCase()){
            return true
        }

        //Single guess match
		const currentWordStringArray = this.currentWord.split('');

		const remainingLettersArray = currentWordStringArray.filter((character) => {
			//Return matched letter
			for (let guessedLetter of this.guessedLetters) {
				if (guessedLetter === character) {
					return false;
				}
			}

			const regex = /[?!\-,\s.]/;
			if (regex.test(character)) {
				return false;
			}

			//If character doesn't match any guessed characters, then we return the character left
			return true;
		});

		//Check if any characters in challenge word remain
		if (remainingLettersArray.length > 0) {
			return false;
		} else {
			return true;
		}
	}

	async getPlayerGuess(playerName = ''): Promise<PlayerGuess> {
		const playerGuess: PlayerGuess = {
			guessString: '',
			guessType: 'single',
		};

		//Prompt for whether full word or just character
		const guessTypeSelection = await select({
			message: playerName
                ? `${playerName} Select guess type: `
                : 'Select guess type: ',
			choices: [
				{
					name: 'Full word',
					value: 'full',
				},
				{
					name: 'Single character',
					value: 'single',
				},
			],
		});

        await removeLines(2);
        
        //Prompt user for guesses
		if (guessTypeSelection === 'single') {
			const guess = await input({
				message: playerName
					? `${playerName}, select a character: `
					: 'Select a character',
				validate: (guess) => {
					const validCharExpression = new RegExp('^[a-zA-Z]+$');

					if (guess.length > 1) {
						return 'Must be one character';
					} else if (
						this.guessedLetters.some((character) => character === guess)
					) {
						//If the guess matches a guessed letter, then we reject
						return 'Already tried this letter!';
					} else if (!validCharExpression.test(guess)) {
						return 'Must use valid character';
					} else {
						return true;
					}
				},
			});


			playerGuess.guessString = guess;
			playerGuess.guessType = 'single';

			return playerGuess;
		} else if (guessTypeSelection === 'full') {
			const guess = await input({
				message: playerName ? `${playerName}, type guess: ` : 'Type guess',
				validate: (guess) => {
					const validExpression = new RegExp(/^[a-zA-Z\s!?\-,]+$/);

					if (!validExpression.test(guess)) {
						return 'Must use valid characters';
					} else {
						return true;
					}
				},
			});

			playerGuess.guessString = guess;
			playerGuess.guessType = 'full';

			return playerGuess;
		}
	}

	resetTurn() {
		this.currentWord = '';
		this.guessedLetters = [];
        this.guessString = "";
	}
}

export class OnePlayer extends HangmanGame {
    constructor(playerName: string) {
        super();
        this.playerName = playerName;
       
    }

    playerName: string = "";

    async getCurrentWord(theme: string): Promise<void>{

        //Fetch correct file
        switch(theme){
            case "movies":
                const moviesJSON = await fs.readFile("./src/assets/hangman/movies.json", "utf-8");
                const parsedMoviesList = await JSON.parse(moviesJSON);

                //Select random list item
                const randomNumberOne = Math.floor(Math.random() * parsedMoviesList.length - 1);
                const movieName = parsedMoviesList[randomNumberOne];

                this.currentWord = movieName.toLowerCase();
                break
            case "actors":
                const actorsJSON = await fs.readFile("./src/assets/hangman/actors.json", "utf-8");
                const parsedActorsList = await JSON.parse(actorsJSON);

                //Select random list item
                const randomNumberTwo = Math.floor(Math.random() * parsedActorsList.length - 1);
                const actorName = parsedActorsList[randomNumberTwo];

                this.currentWord = actorName.toLowerCase();
                break
            case "countries":
                const countriesJSON = await fs.readFile("./src/assets/countries.json", "utf-8");
                const countriesObject = await JSON.parse(countriesJSON);
                const countriesList = Object.keys(countriesObject);

                //Select random list item
                const randomNumberThree = Math.floor(Math.random() * countriesList.length - 1);
                const country = countriesList[randomNumberThree];
                this.currentWord = country.toLowerCase();
                break
        
        };
    }

    async selectTheme(): Promise<string>{

        const themeSelection = await select({
            message: "Select game theme: ",
            choices: [
                {
                    name: "Movies",
                    value: "movies"
                },
                {
                    name: "Countries",
                    value: "countries"
                },
                {
                    name: "Actors",
                    value: "actors"
                }
            ]
        })

        return themeSelection;
    }

    generateGameScreen(): void {
		let gameScreen = '';

		//Title
		const hangmanTitleText = hangmanTitle('Hangman');
		const hangmanTitleGraphic = hangmanHeaderBox(hangmanTitleText);
		clearScreen([hangmanTitleGraphic]);

		gameScreen += '\n \n'; //Add two lines between header and game screen

		//Current user lives left line
		const livesLeft = this._generateUserLivesLeftString(this.playerName);

		gameScreen += livesLeft;
		gameScreen += '\n\n'; //Add one line

		//Hangman guessed word
		const guessedWordLine = this._convertGuessedWordToString();

		gameScreen += guessedWordLine;
		gameScreen += '\n\n'; //Add three lines

		//Letters chosen letters line
		const guessedLettersString = this._convertGuessedLettersToString();

		gameScreen += guessedLettersString;
		gameScreen += '\n \n'; //Add two lines

		console.log(gameScreen);
	}
}

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
		const playerOne = await input({
			message: 'Player one name: ',
			validate: (string) => {
				if (!string.trim()) {
					return 'Name required';
				} else if (string.trim().length > 10) {
					return 'Name too long';
				} else {
					return true;
				}
			},
		});

		this.playerOneName = playerOne;
	}

	async getPlayerTwoName(): Promise<void> {
		const playerTwo = await input({
			message: 'Player two name: ',
			validate: (string) => {
				if (!string.trim()) {
					return 'Name required';
				} else if (string.trim().length > 10) {
					return 'Name too long';
				} else {
					return true;
				}
			},
		});

		this.playerTwoName = playerTwo;
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
		const oppositePlayer =
			this.currentPlayer !== this.playerOneName
				? this.playerOneName
				: this.playerTwoName;

		const currentWord = await input({
			message: `${oppositePlayer}, please enter a word: `,
			validate: (string) => {
				if (!string.trim()) {
					return 'Word required';
				} else if (string.trim().length < 10 || string.trim().length > 25) {
					return 'Word must be between 5 and 15 characters long';
				} else if (!/^[a-zA-Z\s!?\-,]+$/.test(string)) {
					return 'Word must contain valid characters';
				} else {
					return true;
				}
			},
		});

		this.currentWord = currentWord.trim().toLowerCase();
	}

	generateGameScreen(): void {
		let gameScreen = '';

		//Title
		const hangmanTitleText = hangmanTitle('Hangman');
		const hangmanTitleGraphic = hangmanHeaderBox(hangmanTitleText);
		clearScreen([hangmanTitleGraphic]);

		gameScreen += '\n \n'; //Add two lines between header and game screen

		//User scores  line
		const userScoreLine = `${this.playerOneName} score: ${this.playerOneScore} \t\t ${this.playerTwoName} score: ${this.playerTwoScore}`;

		gameScreen += userScoreLine;
		gameScreen += '\n\n'; //Add one line

		//Current user lives left line
		const livesLeft = this._generateUserLivesLeftString(this.currentPlayer);

		gameScreen += livesLeft;
		gameScreen += '\n\n'; //Add one line

		//Hangman guessed word
		const guessedWordLine = this._convertGuessedWordToString();

		gameScreen += guessedWordLine;
		gameScreen += '\n\n'; //Add three lines

		//Letters chosen letters line
		const guessedLettersString = this._convertGuessedLettersToString();

		gameScreen += guessedLettersString;
		gameScreen += '\n \n'; //Add two lines

		console.log(gameScreen);
	}

	playerWonRound(): void {
		if (this.currentPlayer === this.playerOneName) {
			this.playerOneScore += 1;
		} else if (this.currentPlayer === this.playerTwoName) {
			this.playerTwoScore += 1;
		}
	}
}
