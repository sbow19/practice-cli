#!/usr/bin/env node
import { figletTitle } from './helper/fonts.js';
import { mainDescriptionBox } from './helper/boxes.js';
import {
	checkDefaultExists,
	createDefaultDirectory,
	createDefaultConfigFile,
} from './helper/state.js';
import defaultCLISpinner from './helper/spinner.js';

/**
 * START UP FLOW:
 *  1. Generate default file on first download
 *  2. Check whether default file exists; if not, ask user for basic details
 *  3. Save default settings in default settings in appropriate location based on OS.
 *  4. Fetch data from APIs, such as weather and time for specific location (loading screen)
 *  5. Display data from API fetch.
 *  6. Display breadcrumb trail
 *  7. Display options
 */

console.log(figletTitle('PRACTICE CLI'));

console.log(
	mainDescriptionBox(
		'A simple command-line interface tool to show off some JS functionality!',
	),
);

const mySpinner = defaultCLISpinner('Loading...');
mySpinner.start();

const configCheck = await checkDefaultExists();

try {
	if (!configCheck.configDirExists) {
		mySpinner.update({
			text: 'No directory found... creating one...',
		});
		await createDefaultDirectory();
	} else if (!configCheck.configFileExists) {
		mySpinner.update({
			text: 'No config file found... creating one...',
		});
		await createDefaultConfigFile();
	} else if (configCheck.configSettings) {
		//Start app with default settings
		mySpinner.update({
			text: 'Settings found!',
		});
		mySpinner.success().stop().clear();
	}
} catch (e) {
	//Record some error fetching config settings --> close app
}
