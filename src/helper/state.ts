import fs from 'node:fs/promises';
import path, { dirname, join } from 'node:path';
import os from 'node:os';
import { input, confirm, search } from '@inquirer/prompts';
import { getGeolocation } from '../api/weather.js';
import { fileURLToPath } from 'node:url';

//Helper functions
const determineDirectoryPath = (): [string, string] => {
	const isWindows = process.platform === 'win32';
	const XDG_CONFIG_HOME =
		process.env.XDG_CONFIG_HOME ||
		(isWindows
			? path.join(os.homedir(), 'AppData', 'Local')
			: path.join(os.homedir(), '.config'));
	const CONFIG_DIR = path.join(XDG_CONFIG_HOME, 'practice-cli');
	const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

	return [CONFIG_FILE, CONFIG_DIR];
};

const getListOfCountries = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename)
	const jsonPath = join(__dirname, '../assets/countries.json');
	const countryContentsRaw = await fs.readFile(jsonPath, {
		encoding: 'utf-8',
	});
	const countriesContentParsed: Object = await JSON.parse(countryContentsRaw);

	const listOfCountries = Object.keys(countriesContentParsed);

	return listOfCountries;
};

const getListOfCities = async (countryName: string) => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename)
	const jsonPath = join(__dirname, '../assets/countries.json');
	const countryContentsRaw = await fs.readFile(jsonPath , {
		encoding: 'utf-8',
	});
	const countriesContentParsed: Object = await JSON.parse(countryContentsRaw);

	const listOfCities = countriesContentParsed[countryName];

	return listOfCities;
};

export const checkDefaultExists = (): Promise<ConfigCheck> => {
	return new Promise(async (resolve) => {
		/**
		 * Define base configuration directory, according to XDB Base Directory Specification:
		 *
		 * https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
		 *
		 * */
		const [CONFIG_FILE, CONFIG_DIR] = determineDirectoryPath();

		//Initialise config check object
		const configCheck: ConfigCheck = {
			configDirExists: false,
			configFileExists: false,
			configSettings: null,
		};

		// Check if config directory exists
		try {
			await fs.stat(CONFIG_DIR);
			configCheck.configDirExists = true;
		} catch (e) {
			resolve(configCheck);
		}

		//Check if config file exists
		try {
			const userSettings = await fs.readFile(CONFIG_FILE);
			configCheck.configFileExists = true;
			configCheck.configSettings = JSON.parse(userSettings);
			resolve(configCheck);
		} catch (e) {
			resolve(configCheck);
		}
	});
};

export const createDefaults = (configCheck: ConfigCheck): Promise<ConfigSettings | false> => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!configCheck.configDirExists) {
				//Create directory
				await createDefaultDirectory();

				//Create file
				const configSettings = await createDefaultConfigFile();

				resolve(configSettings);
			} else if (!configCheck.configFileExists) {
				//Create file
				const configSettings = await createDefaultConfigFile();

				resolve(configSettings);
			}
		} catch (e) {
			//Record some error fetching config settings --> close app
			reject(false);
		}
	});
};

const createDefaultDirectory = (): Promise<void> => {
	return new Promise(async (resolve, reject) => {
		//Determine file path
		const [, CONFIG_DIR] = determineDirectoryPath();
		try {
			await fs.mkdir(CONFIG_DIR, { recursive: true });
			resolve();
		} catch (e) {
			reject();
		}
	});
};

export const createDefaultConfigFile = (): Promise<ConfigSettings> => {
	return new Promise(async (resolve, reject) => {
		//Determine file path
		const [CONFIG_FILE] = determineDirectoryPath();

		//UserCOnfigObject
		let configSettings: ConfigSettings = {
			name: 'Default',
			country: '',
			city: {
				name: '',
				latitude: 0,
				longitude: 0,
			},
		};

		//Prompt for user input
		configSettings.name = await input({
			message: 'What is your name?',
			required: true,
		});

		//Which country are you located in?
		const listOfCountries = await getListOfCountries();

		//Prompt for user name
		const country = await search({
			message: 'Which country are you located in?',
			source: (input) => {
				if (input) {
					const filteredCountries = listOfCountries.filter((country) => {
						if (country.toLowerCase().startsWith(input.toLowerCase())) {
							return true;
						} else {
							return false;
						}
					});

					const choiceArray = [];
					for (let country of filteredCountries) {
						choiceArray.push({ name: country, value: country });
					}

					return choiceArray;
				} else {
					return [];
				}
			},
		});

		//And which city?
		const listOfCities = await getListOfCities(country);

		//Prompt for user city
		const cityName = await search({
			message: 'Which city are you located in?',
			source: (input) => {
				if (input) {
					const filteredCities = listOfCities.filter((city) => {
						if (city.toLowerCase().startsWith(input.toLowerCase())) {
							return true;
						} else {
							return false;
						}
					});

					const choiceArray = [];
					for (let city of filteredCities) {
						choiceArray.push({ name: city, value: city });
					}

					return choiceArray;
				} else {
					return [];
				}
			},
		});

		configSettings.country = country;
		configSettings.city.name = cityName;

		//Fetch city latitude and longitude
		try {
			const { latitude, longitude } = await getGeolocation(country, cityName);
			configSettings.city.latitude = latitude;
			configSettings.city.longitude = longitude;
		} catch (e) {
			console.log(
				'Failed to fetch geolocation data. Using default coordinates.',
			);
			configSettings.city.latitude = 0;
			configSettings.city.longitude = 0;
		}

		//Write data to new json file
		try {
			await fs.writeFile(CONFIG_FILE, JSON.stringify(configSettings));
			resolve(configSettings);
		} catch (e) {
			console.log(e);
			reject(false);
		}
	});
};
