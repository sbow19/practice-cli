import { mainDescriptionBox, hangmanHeaderBox } from "#helper/boxes.js";
import { hangmanTitle } from "#helper/fonts.js";
import { clearScreen, removeLines } from "#helper/stdout_funcs.js";
import timeout from "#helper/timeout.js";
import { confirm, select } from '@inquirer/prompts';

const randomSentenceApp = async()=>{

    //Main event loop variable
    let isSentenceActive = true;

    //print title and description boc
	const sentenceTitleText = hangmanTitle('RandomSentenceGenerator');
	const sentenceTitleGraphic = hangmanHeaderBox(sentenceTitleText);
	clearScreen([
		sentenceTitleGraphic,
		mainDescriptionBox("Generate random sentences!"),
	]);

    await timeout(1000);

	//Prompt for continue
	isSentenceActive = await confirm({
		message: 'Do you want to continue?',
		default: true,
	});
}

export default randomSentenceApp;