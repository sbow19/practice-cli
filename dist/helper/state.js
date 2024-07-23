import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { input, search } from '@inquirer/prompts';
const determineDirectoryPath = () => {
    const isWindows = process.platform === 'win32';
    const XDG_CONFIG_HOME = process.env.XDG_CONFIG_HOME ||
        (isWindows
            ? path.join(os.homedir(), 'AppData', 'Local')
            : path.join(os.homedir(), '.config'));
    const CONFIG_DIR = path.join(XDG_CONFIG_HOME, 'practice-cli');
    const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');
    return [CONFIG_FILE, CONFIG_DIR];
};
const getListOfCountries = async () => {
    const countryContentsRaw = await fs.readFile('./dist/assets/countries.json', {
        encoding: 'utf-8',
    });
    const countriesContentParsed = await JSON.parse(countryContentsRaw);
    const listOfCountries = Object.keys(countriesContentParsed);
    return listOfCountries;
};
const getListOfCities = async (countryName) => {
    const countryContentsRaw = await fs.readFile('./dist/assets/countries.json', {
        encoding: 'utf-8',
    });
    const countriesContentParsed = await JSON.parse(countryContentsRaw);
    const listOfCities = countriesContentParsed[countryName];
    return listOfCities;
};
export const checkDefaultExists = () => {
    return new Promise(async (resolve) => {
        const [CONFIG_FILE, CONFIG_DIR] = determineDirectoryPath();
        const configCheck = {
            configDirExists: false,
            configFileExists: false,
            configSettings: null,
        };
        try {
            await fs.stat(CONFIG_DIR);
            configCheck.configDirExists = true;
        }
        catch (e) {
            resolve(configCheck);
        }
        try {
            const userSettings = await fs.readFile(CONFIG_FILE);
            configCheck.configFileExists = true;
            configCheck.configSettings = JSON.parse(userSettings);
            resolve(configCheck);
        }
        catch (e) {
            resolve(configCheck);
        }
    });
};
export const createDefaults = (configCheck) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!configCheck.configDirExists) {
                await createDefaultDirectory();
                await createDefaultConfigFile();
                resolve(true);
            }
            else if (!configCheck.configFileExists) {
                await createDefaultConfigFile();
                resolve(true);
            }
        }
        catch (e) {
            reject(false);
        }
    });
};
const createDefaultDirectory = () => {
    return new Promise(async (resolve, reject) => {
        const [CONFIG_DIR] = determineDirectoryPath();
        try {
            await fs.mkdir(CONFIG_DIR, { recursive: true });
            resolve();
        }
        catch (e) {
            reject();
        }
    });
};
const createDefaultConfigFile = () => {
    return new Promise(async (resolve, reject) => {
        const [CONFIG_FILE,] = determineDirectoryPath();
        let configSettings = {
            name: 'Default',
            country: "",
            city: ""
        };
        const listOfCountries = await getListOfCountries();
        configSettings.name = await input({
            message: 'What is your name?',
            required: true,
        });
        const country = await search({
            message: 'Which country are you located in?',
            source: (input) => {
                if (input) {
                    const filteredCountries = listOfCountries.filter((country) => {
                        if (country.toLowerCase().startsWith(input.toLowerCase())) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    const choiceArray = [];
                    for (let country of filteredCountries) {
                        choiceArray.push({ name: country, value: country });
                    }
                    return choiceArray;
                }
                else {
                    return [];
                }
            },
        });
        const listOfCities = await getListOfCities(country);
        const city = await search({
            message: 'Which city are you located in?',
            source: (input) => {
                if (input) {
                    const filteredCities = listOfCities.filter((city) => {
                        if (city.toLowerCase().startsWith(input.toLowerCase())) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    const choiceArray = [];
                    for (let city of filteredCities) {
                        choiceArray.push({ name: city, value: city });
                    }
                    return choiceArray;
                }
                else {
                    return [];
                }
            },
        });
        configSettings.country = country;
        configSettings.city = city;
        try {
            await fs.writeFile(CONFIG_FILE, JSON.stringify(configSettings));
            resolve(true);
        }
        catch (e) {
            console.log(e);
            reject(false);
        }
    });
};
//# sourceMappingURL=state.js.map