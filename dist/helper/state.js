import fs from 'node:fs/promises';
import path, { dirname, join } from 'node:path';
import os from 'node:os';
import { input, search } from '@inquirer/prompts';
import { getGeolocation } from '../api/weather.js';
import { fileURLToPath } from 'node:url';
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
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const jsonPath = join(__dirname, '../assets/countries.json');
    const countryContentsRaw = await fs.readFile(jsonPath, {
        encoding: 'utf-8',
    });
    const countriesContentParsed = await JSON.parse(countryContentsRaw);
    const listOfCountries = Object.keys(countriesContentParsed);
    return listOfCountries;
};
const getListOfCities = async (countryName) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const jsonPath = join(__dirname, '../assets/countries.json');
    const countryContentsRaw = await fs.readFile(jsonPath, {
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
                const configSettings = await createDefaultConfigFile();
                resolve(configSettings);
            }
            else if (!configCheck.configFileExists) {
                const configSettings = await createDefaultConfigFile();
                resolve(configSettings);
            }
        }
        catch (e) {
            reject(false);
        }
    });
};
const createDefaultDirectory = () => {
    return new Promise(async (resolve, reject) => {
        const [, CONFIG_DIR] = determineDirectoryPath();
        try {
            await fs.mkdir(CONFIG_DIR, { recursive: true });
            resolve();
        }
        catch (e) {
            reject();
        }
    });
};
export const createDefaultConfigFile = () => {
    return new Promise(async (resolve, reject) => {
        const [CONFIG_FILE] = determineDirectoryPath();
        let configSettings = {
            name: 'Default',
            country: '',
            city: {
                name: '',
                latitude: 0,
                longitude: 0,
            },
        };
        configSettings.name = await input({
            message: 'What is your name?',
            required: true,
        });
        const listOfCountries = await getListOfCountries();
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
        const cityName = await search({
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
        configSettings.city.name = cityName;
        try {
            const { latitude, longitude } = await getGeolocation(country, cityName);
            configSettings.city.latitude = latitude;
            configSettings.city.longitude = longitude;
        }
        catch (e) {
            console.log('Failed to fetch geolocation data. Using default coordinates.');
            configSettings.city.latitude = 0;
            configSettings.city.longitude = 0;
        }
        try {
            await fs.writeFile(CONFIG_FILE, JSON.stringify(configSettings));
            resolve(configSettings);
        }
        catch (e) {
            console.log(e);
            reject(false);
        }
    });
};
//# sourceMappingURL=state.js.map