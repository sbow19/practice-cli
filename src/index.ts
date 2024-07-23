#!/usr/bin/env node
import { figletTitle } from './helper/fonts.js';
import { mainDescriptionBox } from './helper/boxes.js';
import { checkDefaultExists, createDefaults } from './helper/state.js';
import defaultCLISpinner from './helper/spinner.js';

/**
 * START UP FLOW:
 *  1. Generate default file on first download - DONE
 *  2. Check whether default file exists; if not, ask user for basic details - DONE
 *  3. Save default settings in default settings in appropriate location based on OS. - DONE
 *  4. Fetch data from APIs, such as weather and time for specific location (loading screen)
 *  5. Display data from API fetch.
 *  6. Display breadcrumb trail
 *  7. Display options
 */
//Loading spinner
const mySpinner = defaultCLISpinner('Loading...');
mySpinner.start();

//Checking settings logic
let userSettings;
const configCheck = await checkDefaultExists();

if (!configCheck.configDirExists || !configCheck.configFileExists) {
	try {
        mySpinner.stop().clear();
		console.log("No defaults found...Creating defaults");
		const result = await createDefaults(configCheck);
        if (result) {
            console.log('Defaults created successfully!');
        } else {
            console.error('Failed to create defaults. Please try again.');
            process.exit(1);
        }
        
	} catch (e) {
		mySpinner.error().stop().clear();
		console.error('Failed to create defaults. Please try again.');
		process.exit(1);
	}
} else if (configCheck.configSettings) {
    mySpinner.stop().clear();
	userSettings = configCheck.configSettings;
}

// Print the title with figlet
console.log(figletTitle('PRACTICE CLI'));
console.log(
	mainDescriptionBox(
		'A simple command-line interface tool to show off some JS functionality!',
		`Welcome ${userSettings?.name ?? "User"}`,
	),
);

//Fetch weather and time from APIs
