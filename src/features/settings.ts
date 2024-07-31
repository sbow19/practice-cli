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
    console.log(settingsValues);
	clearScreen([
		settingsTitleGraphic,
		mainDescriptionBox("Change your settings"),
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

    //Start settings loop
    while(isSettingsActive){
        
        await createDefaultConfigFile();

        //Prompt for continue
        isSettingsActive = await confirm({
            message: 'Do you want to update settings?',
            default: true,
        });

        await removeLines(2);
    }


}

export default settings;