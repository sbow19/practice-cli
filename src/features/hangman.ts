import defaultCLISpinner from "#helper/spinner.js";
import { hangmanTitle } from "#helper/fonts.js";
import { mainDescriptionBox, hangmanHeaderBox } from "#helper/boxes.js";
import { clearScreen } from "#helper/stdout_funcs.js";
import timeout from "#helper/timeout.js";
import { confirm, select } from '@inquirer/prompts';
import { removeLines } from "#helper/stdout_funcs.js";
import onePlayer from "#features/hangman_one.js";
import twoPlayer from "#features/hangman_two.js";

const hangmanApp = (): Promise<void>=>{
    return new Promise(async(resolve, reject)=>{
        //Main event loop variable
		let isHangmanActive = true;

        /**
         * ADD EVENT LISTENER TO BREAK OUT OF GAME LOOP
         */

		//Create spinner to be user in app
		const mySpinner = defaultCLISpinner('Loading...');

        //print title and description boc
		const hangmanTitleText = hangmanTitle('Hangman');
		const hangmanTitleGraphic = hangmanHeaderBox(hangmanTitleText);
		clearScreen([
			hangmanTitleGraphic,
			mainDescriptionBox("Let's play hangman!"),
		]);

        await timeout(1000);

		//Prompt for continue
		isHangmanActive = await confirm({
			message: 'Do you want to continue?',
			default: true,
		});

        await removeLines(2);

        while(isHangmanActive){
			//Prompt user for two player or one player
			const playerMode = await select({
				message: 'Do you want to play one player or two player?',
				choices: [
					{
						name: "One Player",
						value: "one"
					},
					{
						name: "Two Player",
						value: "two"
					}
				],
			});

			//Start respective games
			playerMode === "one" ? await onePlayer() : await twoPlayer();

			//Prompt user to continue with hangman
			isHangmanActive = await confirm({
				message: 'Do you want to continue?',
				default: true,
			});

			clearScreen([
				hangmanTitleGraphic,
				mainDescriptionBox("Let's play hangman!"),
			]);
			
        }

        resolve(); //Go back to home page
    })
}

export default hangmanApp;