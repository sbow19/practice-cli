import { removeLines } from "#helper/stdout_funcs.js";
import { confirm, input, select } from "@inquirer/prompts";
import { TwoPlayer } from "#features/hangman_helper.js";

const twoPlayer = ():Promise<void> =>{
    return new Promise(async(resolve)=>{
        //Initialise two player game
        const twoPlayerGame = new TwoPlayer();

        //Prompt user names
        await twoPlayerGame.getPlayerOneName();
        await twoPlayerGame.getPlayerTwoName();

        //Select difficulty of games
        await twoPlayerGame.getGameDifficulty();

        //Select no of games
        await twoPlayerGame.selectNoOfGames();

        while(twoPlayerGame.isGameActive){
            //Prompt player for a word
            await twoPlayerGame.getCurrentWord();

            let isTurnActive = true;
            while(isTurnActive){
                //Programmatically generate new game screen every turn
                const gameScreen = twoPlayerGame.generateGameScreen();
                console.log(gameScreen);

                //Get player's guess

                //Advance to next turn, unless all turns used up, or player wins
                

            }
            
            
        }

    })
}

export default twoPlayer;