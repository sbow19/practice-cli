import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';


export const checkDefaultExists = (): Promise<ConfigCheck> => {
	return new Promise(async (resolve) => {
		const isWindows = process.platform === 'win32';
		/**
		 * Define base configuration directory, according to XDB Base Directory Specification:
		 *
		 * https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
		 *
		 * */
		const XDG_CONFIG_HOME =
			process.env.XDG_CONFIG_HOME ||
			(isWindows
				? path.join(os.homedir(), 'AppData', 'Local')
				: path.join(os.homedir(), '.config'));
		const CONFIG_DIR = path.join(XDG_CONFIG_HOME, 'practice-cli');
		const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

        //Initialise config check object
        const configCheck: ConfigCheck = {
            configDirExists: false,
            configFileExists: false,
            configSettings: null
        }

        // Check if config directory exists
		try {
			await fs.stat(CONFIG_DIR);
            configCheck.configDirExists = true;
		} catch (e) {
			resolve(configCheck);
		};

        //Check if config file exists
        try {
			const userSettings = await fs.readFile(CONFIG_FILE);
            configCheck.configFileExists = true;
            configCheck.configSettings = JSON.parse(userSettings);
            resolve(configCheck)
		} catch (e) {
			resolve(configCheck);
		};

        
	});
};

export const createDefaultDirectory = (): Promise<void> => {
	return new Promise(async (resolve, reject) => {
		const isWindows = process.platform === 'win32';
		const XDG_CONFIG_HOME =
			process.env.XDG_CONFIG_HOME ||
			(isWindows
				? path.join(os.homedir(), 'AppData', 'Local')
				: path.join(os.homedir(), '.config'));
		const CONFIG_DIR = path.join(XDG_CONFIG_HOME, 'practice-cli');


		try {
			await fs.mkdir(CONFIG_DIR, { recursive: true });
			resolve();
		} catch (e) {
			reject();
		}
	});
};

export const createDefaultConfigFile = (): Promise<void> => {
    return new Promise((resolve, reject)=>{
        //Determine file path
        const isWindows = process.platform === 'win32';
        const XDG_CONFIG_HOME =
            process.env.XDG_CONFIG_HOME ||
            (isWindows
               ? path.join(os.homedir(), 'AppData', 'Local')
                : path.join(os.homedir(), '.config'));
        const CONFIG_DIR = path.join(XDG_CONFIG_HOME, 'practice-cli');
        const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

        //Prompt for user input

        //Write data to new json file

        //Save new file
    })
}

