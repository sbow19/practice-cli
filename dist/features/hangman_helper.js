import { input, select } from '@inquirer/prompts';
import { hangmanTitle } from '#helper/fonts.js';
import { hangmanHeaderBox } from '#helper/boxes.js';
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
    isGameActive;
    gameDifficulty;
    livesLeft;
    currentGameScreen;
    currentWord;
    guessedWordString;
    guessedLetters;
    async getGameDifficulty() {
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
    #convertGuessedLettersToString() {
    }
    getCurrentGameScreen() {
        return this.currentGameScreen;
    }
}
export class OnePlayer extends HangmanGame {
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
    playerOneName;
    playerTwoName;
    noOfGames;
    playerOneScore;
    playerTwoScore;
    currentPlayer;
    async getPlayerOneName() {
        let validationLoop = true;
        while (validationLoop) {
            const playerOne = await input({
                message: 'Player one name: ',
            });
            const validationResult = this.#validatePlayerNameInput(playerOne);
            if (validationResult === 'try again') {
                continue;
            }
            else if (validationResult === 'default') {
                validationLoop = false;
            }
            else if (validationResult === 'okay') {
                this.playerOneName = playerOne;
                validationLoop = false;
            }
        }
    }
    async getPlayerTwoName() {
        let validationLoop = true;
        while (validationLoop) {
            const playerTwo = await input({
                message: 'Player two name: ',
            });
            const validationResult = this.#validatePlayerNameInput(playerTwo);
            if (validationResult === 'try again') {
                continue;
            }
            else if (validationResult === 'default') {
                validationLoop = false;
            }
            else if (validationResult === 'okay') {
                this.playerTwoName = playerTwo;
                validationLoop = false;
            }
        }
    }
    #validatePlayerNameInput(playerOneName) {
        if (!playerOneName.trim()) {
            return;
        }
    }
    #validatePlayerWordInput(wordInput) {
        if (!playerOneName.trim()) {
            return;
        }
    }
    async selectNoOfGames() {
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
    async getCurrentWord() {
        let validationLoop = true;
        while (validationLoop) {
            const currentWord = await input({
                message: `${this.currentPlayer}, please enter a word: `,
            });
            const validationResult = this.#validatePlayerWordInput(currentWord);
            if (validationResult === 'try again') {
                continue;
            }
            else if (validationResult === 'okay') {
                this.currentWord = currentWord;
                validationLoop = false;
            }
        }
    }
    generateGameScreen() {
        let gameScreen = '';
        const hangmanTitleText = hangmanTitle('Hangman');
        const hangmanTitleGraphic = hangmanHeaderBox(hangmanTitleText);
        clearScreen([hangmanTitleGraphic]);
        gameScreen += hangmanTitleGraphic;
        gameScreen += '\n \n';
        const userScoreLine = `${this.playerOneName} score: ${this.playerOneScore} \t\t ${this.playerTwoName} score: ${this.playerTwoScore}`;
        gameScreen += userScoreLine;
        gameScreen += '\n';
        const livesLeft = `\t ${this.currentPlayer} lives left: ${this.livesLeft}`;
        gameScreen += livesLeft;
        gameScreen += '\n';
        const guessedWordLine = this.guessedWordString;
        gameScreen += guessedWordLine;
        gameScreen += '\n';
        const guessedLettersString = this.#convertGuessedLettersToString();
        gameScreen += guessedLettersString;
        gameScreen += '\n \n';
        return gameScreen;
    }
}
//# sourceMappingURL=hangman_helper.js.map