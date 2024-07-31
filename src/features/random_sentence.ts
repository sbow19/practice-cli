import { mainDescriptionBox, sentenceHeaderBox } from '#helper/boxes.js';
import { sentenceTitle } from '#helper/fonts.js';
import { clearScreen, removeLines } from '#helper/stdout_funcs.js';
import timeout from '#helper/timeout.js';
import { confirm, select } from '@inquirer/prompts';

const refreshScreen = async () => {
	const sentenceTitleText = sentenceTitle('Random Sentence Generator');
	const sentenceTitleGraphic = sentenceHeaderBox(sentenceTitleText);
	clearScreen([
		sentenceTitleGraphic,
		mainDescriptionBox('Generate random sentences!'),
	]);
};

const randomSentenceApp = async () => {
	//Main event loop variable
	let isSentenceActive = true;

	//print title and description boc
	await refreshScreen();

	await timeout(1000);

	//Prompt for continue
	isSentenceActive = await confirm({
		message: 'Do you want to continue?',
		default: true,
	});

	await removeLines(2);

	while (isSentenceActive) {

		/**
		 * STILL DEVELOPING
		 */

		//Prompt for continue
		isSentenceActive = await confirm({
			message: 'Do you want to continue?',
			default: true,
		});
	}
};

export default randomSentenceApp;
