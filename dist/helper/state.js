import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
export const checkDefaultExists = () => {
    return new Promise(async (resolve) => {
        const isWindows = process.platform === 'win32';
        const XDG_CONFIG_HOME = process.env.XDG_CONFIG_HOME ||
            (isWindows
                ? path.join(os.homedir(), 'AppData', 'Local')
                : path.join(os.homedir(), '.config'));
        const CONFIG_DIR = path.join(XDG_CONFIG_HOME, 'practice-cli');
        const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');
        const configCheck = {
            configDirExists: false,
            configFileExists: false,
            configSettings: null
        };
        try {
            await fs.stat(CONFIG_DIR);
            configCheck.configDirExists = true;
        }
        catch (e) {
            resolve(configCheck);
        }
        ;
        try {
            const userSettings = await fs.readFile(CONFIG_FILE);
            configCheck.configFileExists = true;
            configCheck.configSettings = JSON.parse(userSettings);
            resolve(configCheck);
        }
        catch (e) {
            resolve(configCheck);
        }
        ;
    });
};
export const createDefaultDirectory = () => {
    return new Promise(async (resolve, reject) => {
        const isWindows = process.platform === 'win32';
        const XDG_CONFIG_HOME = process.env.XDG_CONFIG_HOME ||
            (isWindows
                ? path.join(os.homedir(), 'AppData', 'Local')
                : path.join(os.homedir(), '.config'));
        const CONFIG_DIR = path.join(XDG_CONFIG_HOME, 'practice-cli');
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
    return new Promise((resolve, reject) => {
        const isWindows = process.platform === 'win32';
        const XDG_CONFIG_HOME = process.env.XDG_CONFIG_HOME ||
            (isWindows
                ? path.join(os.homedir(), 'AppData', 'Local')
                : path.join(os.homedir(), '.config'));
        const CONFIG_DIR = path.join(XDG_CONFIG_HOME, 'practice-cli');
        const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');
    });
};
//# sourceMappingURL=state.js.map