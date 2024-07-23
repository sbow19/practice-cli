#!/usr/bin/env node
import { figletTitle } from './helper/fonts.js';
import { mainDescriptionBox } from './helper/boxes.js';
import { checkDefaultExists, createDefaultDirectory, createDefaultConfigFile, } from './helper/state.js';
import defaultCLISpinner from './helper/spinner.js';
console.log(figletTitle('PRACTICE CLI'));
console.log(mainDescriptionBox('A simple command-line interface tool to show off some JS functionality!'));
const mySpinner = defaultCLISpinner('Loading...');
mySpinner.start();
const configCheck = await checkDefaultExists();
try {
    if (!configCheck.configDirExists) {
        mySpinner.update({
            text: 'No directory found... creating one...',
        });
        await createDefaultDirectory();
    }
    else if (!configCheck.configFileExists) {
        mySpinner.update({
            text: 'No config file found... creating one...',
        });
        await createDefaultConfigFile();
    }
    else if (configCheck.configSettings) {
        mySpinner.update({
            text: 'Settings found!',
        });
        mySpinner.success().stop().clear();
    }
}
catch (e) {
}
//# sourceMappingURL=index.js.map