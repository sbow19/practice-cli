import { clearScreen, removeLines } from "#helper/stdout_funcs.js";
import { settingsTitle } from "#helper/fonts.js";
import { settingsHeaderBox, mainDescriptionBox, settingsValuesBox } from "#helper/boxes.js";
import timeout from "#helper/timeout.js";
import { checkDefaultExists, createDefaultConfigFile } from '#helper/state.js';
import { confirm } from '@inquirer/prompts';


const refreshScreen = async()=>{

    //Fetch settings values
    const { configSettings } = await checkDefaultExists();

    //print title and description boc
	const settingsTitleText = settingsTitle('Settings');
	const settingsTitleGraphic = settingsHeaderBox(settingsTitleText);
    const settingsValues = settingsValuesBox(configSettings);
	clearScreen([
		settingsTitleGraphic,
		mainDescriptionBox("Change your settings"),
        settingsValues
	]);


}

const settings = async ():Promise<void>=>{

    //Main event loop variable
	let isSettingsActive = true;

    //Refresh screen
    await refreshScreen();
    
    await timeout(1000);

    //Prompt for continue
	isSettingsActive = await confirm({
		message: 'Do you want to update settings?',
		default: true,
	});

    await removeLines(2);

    //Start settings loop
    while(isSettingsActive){
        
        await createDefaultConfigFile();

        await refreshScreen();

        //Prompt for continue
        isSettingsActive = await confirm({
            message: 'Do you want to update settings?',
            default: true,
        });
    }


}

export default settings;