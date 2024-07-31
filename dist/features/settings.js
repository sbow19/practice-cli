import { clearScreen, removeLines } from "#helper/stdout_funcs.js";
import { settingsTitle } from "#helper/fonts.js";
import { settingsHeaderBox, mainDescriptionBox, settingsValuesBox } from "#helper/boxes.js";
import timeout from "#helper/timeout.js";
import { checkDefaultExists, createDefaultConfigFile } from '#helper/state.js';
import { confirm } from '@inquirer/prompts';
const refreshScreen = async () => {
    const { configSettings } = await checkDefaultExists();
    const settingsTitleText = settingsTitle('Settings');
    const settingsTitleGraphic = settingsHeaderBox(settingsTitleText);
    const settingsValues = settingsValuesBox(configSettings);
    clearScreen([
        settingsTitleGraphic,
        mainDescriptionBox("Change your settings"),
        settingsValues
    ]);
};
const settings = async () => {
    let isSettingsActive = true;
    await refreshScreen();
    await timeout(1000);
    isSettingsActive = await confirm({
        message: 'Do you want to update settings?',
        default: true,
    });
    await removeLines(2);
    while (isSettingsActive) {
        await createDefaultConfigFile();
        await refreshScreen();
        isSettingsActive = await confirm({
            message: 'Do you want to update settings?',
            default: true,
        });
    }
};
export default settings;
//# sourceMappingURL=settings.js.map