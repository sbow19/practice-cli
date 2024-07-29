#!/usr/bin/env node
import { mainDescriptionBox, weatherBox } from '#helper/boxes.js';
import { checkDefaultExists, createDefaults } from '#helper/state.js';
import defaultCLISpinner from '#helper/spinner.js';
import getWeather from '#api/weather.js';
import { removeLines, clearScreen } from '#helper/stdout_funcs.js';
import timeout from '#helper/timeout.js';
import { select } from '@inquirer/prompts';
import { keypressListener } from '#helper/listeners.js';
import aniListApp from '#features/anilist.js';
let isCLIActive = true;
keypressListener();
let mySpinner = defaultCLISpinner('Loading...');
mySpinner.start();
await timeout(1000);
let userSettings;
const configCheck = await checkDefaultExists();
if (!configCheck.configDirExists || !configCheck.configFileExists) {
    try {
        await removeLines(1);
        mySpinner.error({
            text: 'No defaults found...Creating defaults',
        });
        await timeout(1000);
        const result = await createDefaults(configCheck);
        if (result) {
            await removeLines(1);
            console.log('Defaults created successfully!');
            userSettings = result;
        }
        else {
            throw false;
        }
    }
    catch (e) {
        mySpinner.error({
            text: 'Failed to create defaults. Please try again.',
        });
        process.exit(1);
    }
}
else if (configCheck.configSettings) {
    mySpinner.success({ text: 'Successfully retrieved settings' });
    await removeLines(2);
    userSettings = configCheck.configSettings;
}
await timeout(2000);
await removeLines(1);
while (isCLIActive) {
    clearScreen([
        mainDescriptionBox('A simple command-line interface tool to show off some JS functionality!', `Welcome ${userSettings?.name ?? 'User'}`),
    ]);
    mySpinner.update({
        text: 'Fetching weather data...',
    });
    mySpinner.start();
    await timeout(2000);
    let weatherInfo;
    if (userSettings) {
        try {
            weatherInfo = await getWeather(userSettings);
            await removeLines(1);
            const weatherLine = `Temperature in ${userSettings.city.name}: ${weatherInfo['temperature_2m']}C`;
            console.log(weatherBox(weatherLine));
        }
        catch (e) {
            mySpinner.error({
                text: 'Failed to fetch weather data. Please try again.',
            });
        }
    }
    else {
        mySpinner.error({
            text: 'No user settings found. Please provide valid settings.',
        });
    }
    mySpinner.stop();
    await removeLines(2);
    const answer = await select({
        message: 'Select an option',
        choices: [
            {
                name: 'Hangman',
                value: 'hangman',
                description: 'A little hangman game',
            },
            {
                name: 'Sentence Generator',
                value: 'sentence',
                description: 'Generate a random sentence',
            },
            {
                name: 'AniList',
                value: 'anilist',
                description: 'Fetch information on anime',
            },
            {
                name: 'Settings',
                value: 'settings',
                description: 'Edit your settings',
            },
            {
                name: 'Exit',
                value: 'exit',
                description: 'Exit the program',
            },
        ],
    });
    switch (answer) {
        case 'exit':
            isCLIActive = false;
            break;
        case 'settings':
        case 'hangman':
        case 'sentence':
        case 'anilist':
            await aniListApp();
            break;
    }
    console.clear();
}
//# sourceMappingURL=index.js.map