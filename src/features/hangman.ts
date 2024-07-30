import defaultCLISpinner from "#helper/spinner.js";
import { hangmanTitle } from "#helper/fonts.js";
import { mainDescriptionBox, hangmanHeaderBox } from "#helper/boxes.js";
import { clearScreen } from "#helper/stdout_funcs.js";
import timeout from "#helper/timeout.js";
import { confirm } from '@inquirer/prompts';
import { removeLines } from "#helper/stdout_funcs.js";

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
		const anilistTitleText = hangmanTitle('Hangman');
		const anilistTitleGraphic = hangmanHeaderBox(anilistTitleText);
		clearScreen([
			anilistTitleGraphic,
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
            if (isHangmanActive) {
				
			}
        }

        resolve(); //Go back to home page
    })
}

export default hangmanApp;