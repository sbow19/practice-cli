#!/usr/bin/env node
import { figletTitle } from './helper/fonts.js';
import { mainDescriptionBox } from './helper/boxes.js';
import { checkDefaultExists, createDefaults } from './helper/state.js';
import defaultCLISpinner from './helper/spinner.js';
const mySpinner = defaultCLISpinner('Loading...');
mySpinner.start();
let userSettings;
const configCheck = await checkDefaultExists();
if (!configCheck.configDirExists || !configCheck.configFileExists) {
    try {
        mySpinner.stop().clear();
        console.log("No defaults found...Creating defaults");
        const result = await createDefaults(configCheck);
        if (result) {
            console.log('Defaults created successfully!');
        }
        else {
            console.error('Failed to create defaults. Please try again.');
            process.exit(1);
        }
    }
    catch (e) {
        mySpinner.error().stop().clear();
        console.error('Failed to create defaults. Please try again.');
        process.exit(1);
    }
}
else if (configCheck.configSettings) {
    mySpinner.stop().clear();
    userSettings = configCheck.configSettings;
}
console.log(figletTitle('PRACTICE CLI'));
console.log(mainDescriptionBox('A simple command-line interface tool to show off some JS functionality!', `Welcome ${userSettings?.name ?? "User"}`));
//# sourceMappingURL=index.js.map